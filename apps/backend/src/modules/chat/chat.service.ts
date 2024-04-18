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
  FindOneChatHistory,
  JobApplicationStatusEnum,
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
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}

  async startJobInterview(
    { jobApplicationId }: CreateInterviewChat,
    userId: string
  ): Promise<CreateInterviewChatResponse> {
    const jobApplication = await this.validateInterviewCreation(
      jobApplicationId,
      userId
    );

    const initialPrompt: OpenAIChatModel[] = [];
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
        content: "Hello, i'm the interviewer bot, let's start your interview!",
      }
    );
    const maxPrompts =
      aiInterviewQuestions.length * 2 +
      Number(this.configService.get('REDUNDANCY_PROMPTS')) +
      2;
    return this.prismaService.jobInterviewChat.create({
      data: { jobApplicationId, history: initialPrompt, maxPrompts },
      include: { jobApplication: { select: { applicationStatus: true } } },
    });
  }

  private async validateInterviewCreation(
    jobApplicationId: string,
    userId: string
  ) {
    const chatInterview = await this.getChatHistory(jobApplicationId, userId);
    const statusErrorMessage = {
        SUBSCRIBED: "You can't start the interview",
        INTERVIEWED: "You've already been interviewed!",
        INVITED: "You've started the interview already",
      };
    
    if (chatInterview) {
      throw new UnauthorizedException(
        statusErrorMessage[chatInterview.jobApplication.applicationStatus]
      );
    }

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
    
    if (jobApplication.applicationStatus!=='INVITED')
         throw new UnauthorizedException(
        statusErrorMessage[jobApplication.applicationStatus]
      );

    return jobApplication;
  }

  async interviewCreateChatCompletion(
    id: string,
    userId: string,
    message: string
  ): Promise<ChatCompletionMessage> {
    const chat = await this.validateChat(id, userId);

    const model = new ConfigService().get<string>('GPT_MODEL') as string;
    const encoder = encoding_for_model(model as any);
    const tokens = encoder.encode(message);
    if (tokens.length > TOKEN_LIMIT)
      throw new BadRequestException('Token limit exceeded');
    encoder.free();

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

    await this.updateChatHistory(id, messages);

    if (
      assistantMessage.content?.includes('#finished') ||
      message.length === chat.maxPrompts
    )
      await this.prismaService.jobApplication.update({
        where: { id: chat.jobApplication.id },
        data: { applicationStatus: JobApplicationStatusEnum.INTERVIEWED },
      });

    return assistantMessage;
  }

  async updateChatHistory(
    id: string,
    messages: Array<ChatCompletionMessageParam>
  ) {
    await this.prismaService.jobInterviewChat.update({
      where: { id },
      data: { history: messages as unknown as Prisma.InputJsonValue },
    });
  }

  async validateChat(id: string, userId: string) {
    const chat = await this.prismaService.jobInterviewChat.findUnique({
      where: { id },
      include: {
        jobApplication: {
          select: { userId: true, id: true, applicationStatus: true },
        },
      },
    });
    if (!chat)
      throw new NotFoundException('Chat with the provided ID does not exist');
    if (chat.jobApplication.userId !== userId)
      throw new UnauthorizedException(
        'You can not modify this chat, it does not belong to you'
      );
    if (
      chat.jobApplication.applicationStatus !== JobApplicationStatusEnum.INVITED
    )
      throw new UnauthorizedException('You can not use the chat');
    return chat;
  }

  getChatHistory(
    jobApplicationId: string,
    userId: string
  ): Promise<FindOneChatHistory | null> {
    return this.prismaService.jobInterviewChat.findFirst({
      where: { jobApplicationId, jobApplication: { userId } },
      include: { jobApplication: { select: { applicationStatus: true } } },
    });
  }
}
