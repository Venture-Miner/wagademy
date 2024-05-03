import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { AccountTypeEnum, User } from '@wagademy/types';
import { DBUser } from '../../shared/decorators';
import { CognitoUserGuard } from '../../infra';
import {
  CreateChatCompletionDto,
  CreateInterviewChatDto,
  GetChatHistoryDto,
} from './dto';
import { MongoIdDto } from '../../shared/dtos';
import {
  FindOneChatHistoryEntity,
  StartJobInterviewEntity,
} from './entities';
import { AccountType } from '../../shared/decorators/account-type.decorator';
import { AccountTypeGuard } from '../../infra/auth/guards/account-type.guard';
import { ChatCompletionMessageEntity } from '../../shared/entities';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiBearerAuth()
  @AccountType(AccountTypeEnum.PHYSICAL_PERSON)
  @UseGuards(CognitoUserGuard, AccountTypeGuard)
  @ApiOperation({
    summary: 'Start a interview chat',
    description:
      'Start a interview chat and creates a new chat with provided details.',
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Interview successfully started.',
    type: StartJobInterviewEntity,
  })
  startJobInterview(
    @Body() createInterviewChatDto: CreateInterviewChatDto,
    @DBUser()
    { id: userId }: User
  ) {
    return this.chatService.startJobInterview(createInterviewChatDto, userId);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @AccountType(AccountTypeEnum.PHYSICAL_PERSON)
  @UseGuards(CognitoUserGuard, AccountTypeGuard)
  @ApiOperation({
    summary: 'Creates a chat completion',
    description: 'Creates a chat completion with provided details.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Chat completions successfully created.',
    type: ChatCompletionMessageEntity,
  })
  interviewCreateChatCompletion(
    @Param() { id }: MongoIdDto,
    @Body() { message }: CreateChatCompletionDto,
    @DBUser()
    { id: userId }: User
  ) {
    return this.chatService.interviewCreateChatCompletion(id, userId, message);
  }

  @Get('history')
  @ApiBearerAuth()
  @AccountType(AccountTypeEnum.PHYSICAL_PERSON)
  @UseGuards(CognitoUserGuard, AccountTypeGuard)
  @ApiOperation({
    summary: 'Get a chat history',
    description: 'Get a chat history with provided details.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Chat history successfully retrieved.',
    type: FindOneChatHistoryEntity,
  })
  getChatsHistory(
    @Query() { jobApplicationId }: GetChatHistoryDto,
    @DBUser()
    { id: userId }: User
  ) {
    return this.chatService.getChatHistory(jobApplicationId, userId);
  }
}
