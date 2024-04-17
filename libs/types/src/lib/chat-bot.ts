import { ChatBotStatusEnum } from '@prisma/client';

export type FilterChatbots = {
  invited?: boolean;
  featured?: boolean;
  mostRecent?: boolean;
};

export type FilterCompanyChatbots = {
  status?: ChatBotStatusEnum;
};

export type CreateFineTuningJob = {
  title: string;
  description: string;
  trainingDataId: string;
  thumbnail: Express.Multer.File;
};

export type UploadTrainingData = {
  trainingData: Express.Multer.File;
};

export type FindOneChatBotResponse = {
  id: string;
  fineTuningJobId: string;
  title: string;
  description: string;
  userId: string;
  status: ChatBotStatusEnum;
  views: number;
  thumbnailId: string;
  createdAt: Date;
};

export type FindManyChatBotsResponse = {
  count: number;
  chatBots: FindOneChatBotResponse[];
};

export type UploadTrainingDataResponse = {
  id: string;
  fileId: string;
  userId: string;
};

export type CreateFineTuningJobResponse = {
  id: string;
  fineTuningJobId: string;
  title: string;
  description: string;
  userId: string;
  status: ChatBotStatusEnum;
  views: number;
  thumbnailId: string;
  createdAt: Date;
};
