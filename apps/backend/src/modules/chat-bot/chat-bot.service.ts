import { Injectable } from '@nestjs/common';
import { PrismaService } from '@wagademy/prisma';
import { FilterChatbots, Pagination } from '@wagademy/types';
import { Prisma } from '@prisma/client';
import { FileService } from '../../infra';

@Injectable()
export class ChatBotService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService
  ) {}

  findManyChatBots(
    { featured, invited, mostRecent }: FilterChatbots,
    { skip, take }: Pagination,
    userId: string
  ) {
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
    return this.prismaService.chatBot.findMany({
      where: {
        AND,
      },
      orderBy,
      skip,
      take,
    });
  }

  async uploadTrainingData(file: Express.Multer.File, userId: string) {
    const { key, url } = await this.fileService.uploadFile(file, 'public-read');
    return this.prismaService.trainingData.create({
      data: {
        file: {
          create: {
            key,
            url,
          },
        },
        user: {
          connect: { id: userId },
        },
      },
    });
  }
}
