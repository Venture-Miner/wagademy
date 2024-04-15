import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  UnauthorizedException,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CognitoUserGuard } from '../../infra';
import { PaginationDto } from '../../shared/dtos';
import { User } from '@wagademy/types';
import { ApiFiles, DBUser } from '../../shared/decorators';
import { FilterChatbotsDto } from './dto/filter-company-jobs.dto';
import { ChatBotService } from './chat-bot.service';
import { UploadTrainingDataDto } from './dto/upload-training-data.dto';
import { validateTrainingData } from './utils/validate-training-data';

@ApiTags('Chat Bot')
@Controller('chat-bot')
export class ChatBotController {
  constructor(private readonly chatBotService: ChatBotService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Retrieve a list of chatbots with optional filters.',
    description:
      'Fetches a list of available chatbots with optional filters for featured, most recent, and invited chatbots.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of chatbots successfully retrieved.',
    // type: TODO
  })
  findManyChatBots(
    @Query() filterChatbotsDto: FilterChatbotsDto,
    @Query() paginationDto: PaginationDto,
    @DBUser()
    { id: userId }: User
  ) {
    return this.chatBotService.findManyChatBots(
      filterChatbotsDto,
      paginationDto,
      userId
    );
  }

  @Post('upload-training-data')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Upload training data for a chatbot.',
    description: 'Uploads training data for a chatbot.',
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Training data successfully uploaded.',
    // type: TODO,
  })
  @ApiFiles(['trainingData'])
  async uploadTrainingData(
    @DBUser()
    { id: userId, accountType }: User,
    @UploadedFiles()
    { trainingData }: { trainingData: Express.Multer.File[] },
    @Body() _uploadTrainingDataDto: UploadTrainingDataDto
  ) {
    const trainingDataFile = trainingData[0];
    try {
      validateTrainingData(trainingDataFile);
    } catch (error) {
      return new BadRequestException(error.message);
    }
    if (accountType !== 'PHYSICAL_PERSON')
      throw new UnauthorizedException(
        'Only individual accounts are allowed to upload training data.'
      );
    return this.chatBotService.uploadTrainingData(trainingDataFile, userId);
  }
}
