import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@wagademy/types';
import { DBUser } from '../../shared/decorators';
import { CognitoUserGuard } from '../../infra';
import { CreateChatCompletionDto, CreateInterviewChatDto } from './dto';
import { MongoIdDto } from '../../shared/dtos';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Start a interview chat',
    description:
      'Start a interview chat and creates a new chat with provided details.',
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Interview successfully started.',
  })
  startJobInterview(
    @Body() createInterviewChatDto: CreateInterviewChatDto,
    @DBUser()
    { id: userId, accountType }: User
  ) {
    if (accountType !== 'PHYSICAL_PERSON')
      throw new UnauthorizedException(
        'Only accounts where the type is physical person can create a job.'
      );
    return this.chatService.startJobInterview(createInterviewChatDto, userId);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Creates a chat completion',
    description: 'Creates a chat completion with provided details.',
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Chat completions successfully created.',
  })
  createChatCompletion(
    @Param() { id }: MongoIdDto,
    @Body() { message }: CreateChatCompletionDto,
    @DBUser()
    { id: userId, accountType }: User
  ) {
    if (accountType !== 'PHYSICAL_PERSON')
      throw new UnauthorizedException(
        'Only accounts where the type is physical person can create a job.'
      );
    return this.chatService.createChatCompletion(id, userId, message);
  }
}
