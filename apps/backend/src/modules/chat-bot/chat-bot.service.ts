import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@wagademy/prisma';
import {
  CreateFineTuningJob,
  CreateFineTuningJobResponse,
  FilterChatbots,
  FindManyChatBotsResponse,
  Pagination,
  UploadTrainingDataResponse,
} from '@wagademy/types';
import { Prisma } from '@prisma/client';
import OpenAI from 'openai';
import { toFile } from 'openai/uploads';
import { FileService } from '../../infra';

@Injectable()
export class ChatBotService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService,
    private readonly openAI: OpenAI
  ) {}

  async findManyChatBots(
    { featured, invited, mostRecent }: FilterChatbots,
    { skip, take }: Pagination,
    userId: string
  ): Promise<FindManyChatBotsResponse> {
    const orderBy: Prisma.ChatBotOrderByWithRelationInput[] = [];
    const AND: Prisma.ChatBotWhereInput[] = [];
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

  // The size of all the files uploaded by one organization can be up to 100 GB.
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
      throw new UnauthorizedException('Training data not found.');
    const { fileId } = trainingData;
    const { id } = await this.openAI.fineTuning.jobs.create({
      training_file: fileId,
      model: 'gpt-3.5-turbo',
    });
    const { key, url } = await this.fileService.uploadFile(
      thumbnail,
      'public-read'
    );
    return this.prismaService.chatBot.create({
      data: {
        fineTuningJobId: id,
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
}
