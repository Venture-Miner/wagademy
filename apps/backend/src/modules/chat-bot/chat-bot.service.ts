import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@wagademy/prisma';
import {
  CreateChatBotCompletion,
  CreateChatCompletionResponse,
  CreateFineTuningJob,
  CreateFineTuningJobResponse,
  FilterChatbots,
  FilterCompanyChatbots,
  FindManyChatBotsResponse,
  FindManyTrainingDataResponse,
  GetChatBotHistoryResponse,
  GetTrainingDataContentResponse,
  InitChatBotResponse,
  InviteToChatBot,
  InviteToChatBotResponse,
  Pagination,
  UploadTrainingData,
  UploadTrainingDataResponse,
} from '@wagademy/types';
import { ChatBotStatusEnum, Prisma, TrainingData } from '@prisma/client';
import OpenAI from 'openai';
import { toFile } from 'openai/uploads';
import { FileService } from '../../infra';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Readable } from 'stream';
import { ChatCompletionMessageParam } from 'openai/resources';

@Injectable()
export class ChatBotService {
  private readonly logger = new Logger(ChatBotService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService,
    private readonly openAI: OpenAI
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
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
      const { status, id: fineTuningJobId, fine_tuned_model } = response;
      if (status === 'succeeded') {
        await this.prismaService.chatBot.update({
          where: { fineTuningJobId },
          data: { status: ChatBotStatusEnum.SUCCESS, model: fine_tuned_model },
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
    { featured, invited, mostRecent, search }: FilterChatbots,
    { skip, take }: Pagination,
    userId: string
  ): Promise<FindManyChatBotsResponse> {
    const orderBy: Prisma.ChatBotOrderByWithRelationInput[] = [];
    const AND: Prisma.ChatBotWhereInput[] = [
      { status: ChatBotStatusEnum.SUCCESS, disabled: false },
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
    if (search) {
      AND.push({ title: { contains: search, mode: 'insensitive' } });
    }
    const [count, chatBots] = await Promise.all([
      this.prismaService.chatBot.count({ where: { AND } }),
      this.prismaService.chatBot.findMany({
        where: { AND },
        orderBy,
        skip,
        take,
        include: { thumbnail: true },
      }),
    ]);
    return { count, chatBots };
  }

  async findManyCompanyChatBots(
    { status }: FilterCompanyChatbots,
    { skip, take }: Pagination,
    userId: string
  ): Promise<FindManyChatBotsResponse> {
    const AND: Prisma.ChatBotWhereInput[] = [{ userId, disabled: false }];
    if (status) {
      AND.push({ status });
    }
    const [count, chatBots] = await Promise.all([
      this.prismaService.chatBot.count({ where: { AND } }),
      this.prismaService.chatBot.findMany({
        where: { AND },
        skip,
        take,
        include: { thumbnail: true },
      }),
    ]);
    return { count, chatBots };
  }

  // REVIEW: The size of all the files uploaded by one organization can be up to 100 GB.
  async uploadTrainingData(
    file: Express.Multer.File,
    { title }: UploadTrainingData,
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
        title,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  getTrainingDataDropdownOptions(
    userId: string
  ): Promise<Pick<TrainingData, 'id' | 'title'>[]> {
    return this.prismaService.trainingData.findMany({
      where: {
        userId,
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
      include: { thumbnail: true },
    });
  }

  async delete(id: string, userId: string) {
    const chatBot = await this.prismaService.chatBot.findFirst({
      where: { id, user: { id: userId } },
    });
    if (!chatBot) throw new BadRequestException('Chatbot not found.');
    const { status, fineTuningJobId } = chatBot;
    if (status === ChatBotStatusEnum.SUCCESS) {
      await this.prismaService.chatBot.update({
        where: { id },
        data: {
          disabled: true,
        },
      });
      return;
    }

    await this.prismaService.chatBot.delete({ where: { id } });

    if (status === ChatBotStatusEnum.PROCESSING) {
      await this.openAI.fineTuning.jobs.cancel(fineTuningJobId);
    }
  }

  async deleteTrainingData(id: string, userId: string) {
    const trainingData = await this.prismaService.trainingData.findFirst({
      where: { id, user: { id: userId } },
    });
    if (!trainingData)
      throw new BadRequestException('Training data not found.');
    await this.openAI.files.del(trainingData.fileId);
    await this.prismaService.trainingData.delete({ where: { id } });
  }

  async getTrainingDataContent(
    id: string,
    userId: string
  ): Promise<GetTrainingDataContentResponse> {
    const trainingData = await this.prismaService.trainingData.findFirst({
      where: { id, user: { id: userId } },
    });
    if (!trainingData)
      throw new BadRequestException('Training data not found.');
    const file = await this.openAI.files.content(trainingData.fileId);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileStream = Readable.from(buffer);
    return fileStream;
  }

  async findManyTrainingData(
    pagination: Pagination,
    userId: string
  ): Promise<FindManyTrainingDataResponse> {
    const [count, trainingData] = await Promise.all([
      this.prismaService.trainingData.count({ where: { userId } }),
      this.prismaService.trainingData.findMany({
        where: { userId },
        skip: pagination.skip,
        take: pagination.take,
      }),
    ]);
    return { count, trainingData };
  }

  async initChatBot(
    userId: string,
    chatBotId: string
  ): Promise<InitChatBotResponse> {
    const userIsInvited = await this.prismaService.invitation.count({
      where: {
        userId,
        chatBotId,
      },
    });
    //TODO: check if user has credits
    const userHasCredits = false;
    if (!userIsInvited && !userHasCredits) {
      throw new UnauthorizedException('User is not invited nor has credits.');
    }
    const history = await this.prismaService.chatBotHistory.findFirst({
      where: { chatBotId, userId },
    });
    if (history) {
      throw new BadRequestException('Chatbot already initialized.');
    }
    const chatBot = await this.prismaService.chatBot.findFirst({
      where: {
        id: chatBotId,
      },
    });
    if (!chatBot) {
      throw new BadRequestException('Chatbot not found.');
    }
    if (chatBot.status !== ChatBotStatusEnum.SUCCESS) {
      throw new BadRequestException('Chatbot is not ready.');
    }
    const [chatBotHistory] = await this.prismaService.$transaction([
      this.prismaService.chatBotHistory.create({
        data: {
          chatBot: {
            connect: { id: chatBotId },
          },
          user: {
            connect: { id: userId },
          },
          history: [
            {
              role: 'assistant',
              content: "Hi, I'm here to help you!",
            },
          ],
        },
        include: { chatBot: { select: { title: true } } },
      }),
      this.prismaService.chatBot.update({
        where: { id: chatBotId },
        data: { views: { increment: 1 } },
      }),
    ]);
    return chatBotHistory;
  }

  async inviteUser(
    { chatBotId, userId }: InviteToChatBot,
    companyId
  ): Promise<InviteToChatBotResponse> {
    const chatBot = await this.prismaService.chatBot.findFirst({
      where: { id: chatBotId, user: { id: companyId } },
    });
    if (!chatBot) {
      throw new BadRequestException('Chatbot not found.');
    }
    return this.prismaService.invitation.create({
      data: {
        chatBot: {
          connect: { id: chatBotId },
        },
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async removeInvitation(id: string, companyId: string) {
    const invitation = await this.prismaService.invitation.findFirst({
      where: {
        id,
        chatBot: { userId: companyId },
      },
    });
    if (!invitation) {
      throw new BadRequestException('Invitation not found.');
    }
    await this.prismaService.invitation.delete({
      where: { id },
    });
  }

  async createChatCompletion(
    id: string,
    { chatBotId, message }: CreateChatBotCompletion,
    userId: string
  ): Promise<CreateChatCompletionResponse> {
    const chatBot = await this.prismaService.chatBot.findFirst({
      where: { id: chatBotId },
    });
    if (!chatBot) {
      throw new NotFoundException('Chatbot not found.');
    }
    const model = chatBot.model;
    if (!model) {
      throw new BadRequestException('Chatbot is not ready.');
    }
    const chatBotHistory = await this.prismaService.chatBotHistory.findFirst({
      where: { chatBotId, userId },
    });
    if (!chatBotHistory) {
      throw new BadRequestException('Chatbot not initialized.');
    }
    const invitation = await this.prismaService.invitation.findFirst({
      where: { chatBotId, userId },
    });
    if (invitation) {
      //TODO: Charge company credits
    } else {
      //TODO: Charge user credits
    }
    let messages: Array<ChatCompletionMessageParam> = [
      ...(chatBotHistory.history as unknown as Array<ChatCompletionMessageParam>),
      { role: 'user', content: message },
    ];
    const response = await this.openAI.chat.completions.create({
      model,
      messages,
    });
    const assistantMessage = response.choices[0].message;
    messages = [...messages, assistantMessage];
    await this.prismaService.chatBotHistory.update({
      where: { id },
      data: { history: messages as unknown as Prisma.InputJsonValue },
    });
    return assistantMessage;
  }

  async getChatHistory(
    chatBotId: string,
    userId: string
  ): Promise<GetChatBotHistoryResponse> {
    const chatBotHistory = await this.prismaService.chatBotHistory.findFirst({
      where: { chatBotId, userId },
      include: { chatBot: { select: { title: true } } },
    });
    if (!chatBotHistory) {
      throw new BadRequestException('Chatbot not initialized.');
    }
    return chatBotHistory;
  }
}
