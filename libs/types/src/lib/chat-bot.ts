import { ChatBotStatusEnum } from '@prisma/client';
import OpenAI from 'openai';

export type FilterChatbots = {
  invited?: boolean;
  featured?: boolean;
  mostRecent?: boolean;
};

export type FilterCompanyChatbots = {
  status?: ChatBotStatusEnum;
};

export type GetTrainingDataContentResponse = any;

export type FindManyTrainingDataResponse = {
  count: number;
  trainingData: TrainingData[];
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

export type ChatBot = {
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

export type TrainingData = {
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

export type InitChatBotResponse = {
  id: string;
  history: any;
  userId: string;
  chatBotId: string;
};

export type InviteToChatBot = {
  chatBotId: string;
  userId: string;
};

export type InviteToChatBotResponse = {
  id: string;
  chatBotId: string;
  userId: string;
};

export type CreateChatBotCompletion = {
  chatBotId: string;
  message: string;
};

export type CreateChatCompletionResponse =
  OpenAI.Chat.Completions.ChatCompletionMessage;

export type GetChatBotHistoryResponse = {
  id: string;
  history: any;
  userId: string;
  chatBotId: string;
};
