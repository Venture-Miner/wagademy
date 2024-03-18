import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ChatCompletionMessage,
  CreateInterviewChat,
  CreateInterviewChatResponse,
  OpenAIChatModel,
} from '@wagademy/types';
import { PrismaService } from '@wagademy/prisma';
import { encoding_for_model } from 'tiktoken';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import { interviewSystemPrompt } from './constants/interview-system-prompt';
import { Prisma } from '@prisma/client';

const TOKEN_LIMIT = 300;

@Injectable()
export class ChatService {
  constructor(
    private readonly openAI: OpenAI,
    private readonly prismaService: PrismaService
  ) {}

  async startJobInterview(
    { jobApplicationId }: CreateInterviewChat,
    userId: string
  ): Promise<CreateInterviewChatResponse> {
    const initialPrompt: OpenAIChatModel[] = [];
    const jobApplication = await this.prismaService.jobApplication.findFirst({
      where: { id: jobApplicationId, userId },
      include: {
        job: {
          select: {
            aiInterviewQuestions: true,
            title: true,
            description: true,
          },
        },
      },
    });
    if (!jobApplication) {
      throw new NotFoundException(
        'Job application with the provided ID does not exist'
      );
    }
    const {
      job: { aiInterviewQuestions, description, title },
    } = jobApplication;
    const initialPromptString = interviewSystemPrompt(
      title,
      description,
      aiInterviewQuestions
    );
    initialPrompt.push(
      { role: 'system', content: initialPromptString },
      {
        role: 'assistant',
        content: "Hello, i'm the bot interviewer, let'start your interview!",
      }
    );
    return this.prismaService.jobInterviewChat.create({
      data: { jobApplicationId, history: initialPrompt },
    });
  }

  async createChatCompletion(
    id: string,
    userId: string,
    message: string
  ): Promise<ChatCompletionMessage> {
    const chat = await this.prismaService.jobInterviewChat.findUnique({
      where: { id },
      include: { jobApplication: { select: { userId: true } } },
    });
    if (!chat)
      throw new NotFoundException('Chat with the provided ID does not exist');
    if (chat.jobApplication.userId !== userId)
      throw new UnauthorizedException(
        'You can not modify this chat, it does not belong to you'
      );

    const model = new ConfigService().get<string>('GPT_MODEL') as string;
    const encoder = encoding_for_model(model as any);
    const tokens = encoder.encode(message);
    if (tokens.length > TOKEN_LIMIT)
      throw new BadRequestException('Token limit exceeded');

    const history =
      chat.history as unknown as Array<ChatCompletionMessageParam>;
    let messages: Array<ChatCompletionMessageParam> = [
      ...history,
      { role: 'user', content: message },
    ];

    const response = await this.openAI.chat.completions.create({
      model,
      messages,
    });
    const assistantMessage = response.choices[0].message;
    messages = [...messages, assistantMessage];

    await this.prismaService.jobInterviewChat.update({
      where: {
        id,
      },
      data: {
        history: messages as unknown as Prisma.InputJsonValue,
      },
    });
    return response.choices[0].message;
  }
}
