import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@wagademy/prisma';
import {
  CreateFineTuningJob,
  CreateFineTuningJobResponse,
  FilterChatbots,
  FilterCompanyChatbots,
  FindManyChatBotsResponse,
  Pagination,
  UploadTrainingDataResponse,
} from '@wagademy/types';
import { ChatBotStatusEnum, Prisma } from '@prisma/client';
import OpenAI from 'openai';
import { toFile } from 'openai/uploads';
import { FileService } from '../../infra';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ChatBotService {
  private readonly logger = new Logger(ChatBotService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService,
    private readonly openAI: OpenAI
  ) {}

  @Cron('* 1 * * * *')
  async statusCron() {
    this.logger.debug('Checking for processing fine-tuning jobs...');
    const processingFineTuningJobs = await this.prismaService.chatBot.findMany({
      where: { status: ChatBotStatusEnum.PROCESSING },
    });
    const responses = await Promise.all(
      processingFineTuningJobs.map(({ fineTuningJobId }) => {
        return this.openAI.fineTuning.jobs.retrieve(fineTuningJobId);
      })
    );
    responses.forEach(async (response) => {
      const { status, id: fineTuningJobId } = response;
      if (status === 'succeeded') {
        await this.prismaService.chatBot.update({
          where: { fineTuningJobId },
          data: { status: ChatBotStatusEnum.SUCCESS },
        });
      } else if (status === 'failed') {
        await this.prismaService.chatBot.update({
          where: { fineTuningJobId },
          data: { status: ChatBotStatusEnum.FAIL },
        });
      }
    });
  }

  async findManyChatBots(
    { featured, invited, mostRecent }: FilterChatbots,
    { skip, take }: Pagination,
    userId: string
  ): Promise<FindManyChatBotsResponse> {
    const orderBy: Prisma.ChatBotOrderByWithRelationInput[] = [];
    const AND: Prisma.ChatBotWhereInput[] = [
      { status: ChatBotStatusEnum.SUCCESS },
    ];
    if (featured) {
      orderBy.push({ views: 'desc' });
    }
    if (invited) {
      AND.push({ invitations: { some: { userId } } });
    }
    if (mostRecent) {
      orderBy.push({ createdAt: 'desc' });
    }
    const [count, chatBots] = await Promise.all([
      this.prismaService.chatBot.count({ where: { AND } }),
      this.prismaService.chatBot.findMany({
        where: { AND },
        orderBy,
        skip,
        take,
      }),
    ]);
    return { count, chatBots };
  }

  async findManyCompanyChatBots(
    { status }: FilterCompanyChatbots,
    { skip, take }: Pagination,
    userId: string
  ): Promise<FindManyChatBotsResponse> {
    const AND: Prisma.ChatBotWhereInput[] = [{ userId }];
    if (status) {
      AND.push({ status });
    }
    const [count, chatBots] = await Promise.all([
      this.prismaService.chatBot.count({ where: { AND } }),
      this.prismaService.chatBot.findMany({
        where: { AND },
        skip,
        take,
      }),
    ]);
    return { count, chatBots };
  }

  // REVIEW: The size of all the files uploaded by one organization can be up to 100 GB.
  async uploadTrainingData(
    file: Express.Multer.File,
    userId: string
  ): Promise<UploadTrainingDataResponse> {
    const convertedFile = await toFile(file.buffer);
    const { id: fileId } = await this.openAI.files.create({
      file: convertedFile,
      purpose: 'fine-tune',
    });
    return this.prismaService.trainingData.create({
      data: {
        fileId,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async createFineTuningJob(
    { trainingDataId, thumbnail, ...rest }: CreateFineTuningJob,
    userId: string
  ): Promise<CreateFineTuningJobResponse> {
    const trainingData = await this.prismaService.trainingData.findFirst({
      where: {
        id: trainingDataId,
        user: { id: userId },
      },
    });
    if (!trainingData)
      throw new BadRequestException('Training data not found.');
    const { fileId } = trainingData;
    const { id: fineTuningJobId } = await this.openAI.fineTuning.jobs.create({
      training_file: fileId,
      model: 'gpt-3.5-turbo',
    });
    const { key, url } = await this.fileService.uploadFile(
      thumbnail,
      'public-read'
    );
    return this.prismaService.chatBot.create({
      data: {
        fineTuningJobId,
        thumbnail: {
          create: {
            key,
            url,
          },
        },
        ...rest,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async delete(id: string, userId: string) {
    const chatBot = await this.prismaService.chatBot.findFirst({
      where: { id, user: { id: userId } },
    });
    if (!chatBot) throw new BadRequestException('Chatbot not found.');
    const { status, fineTuningJobId } = chatBot;
    await this.prismaService.chatBot.delete({ where: { id } });
    if (status === 'PROCESSING') {
      await this.openAI.fineTuning.jobs.cancel(fineTuningJobId);
    }
  }
}
