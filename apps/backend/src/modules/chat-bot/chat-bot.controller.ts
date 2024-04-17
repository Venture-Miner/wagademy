import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
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
import { MongoIdDto, PaginationDto } from '../../shared/dtos';
import { User } from '@wagademy/types';
import { ApiFiles, DBUser } from '../../shared/decorators';
import { ChatBotService } from './chat-bot.service';
import { validateTrainingData } from './utils/validate-training-data';
import {
  CreateFineTuningJobResponseEntity,
  FindManyChatBotsResponseEntity,
  UploadTrainingDataResponseEntity,
  FindManyTrainingDataResponseEntity,
} from './entities';
import {
  CreateFineTuningJobDto,
  FilterChatbotsDto,
  UploadTrainingDataDto,
  FilterCompanyChatBotsDto,
} from './dto';
import { CognitoUserGuard } from '../../infra';

@ApiTags('Chat Bot')
@Controller('chat-bot')
export class ChatBotController {
  constructor(private readonly chatBotService: ChatBotService) {}

  @Get('company')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary:
      'Retrieve a list of chatbots belonging to the company with optional filters.',
    description:
      'Fetches a list of chatbots associated with the company, with the ability to optionally filter by status.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of chatbots successfully retrieved.',
    type: FindManyChatBotsResponseEntity,
  })
  findManyCompanyChatBots(
    @Query() filterCompanyChatbotsDto: FilterCompanyChatBotsDto,
    @Query() paginationDto: PaginationDto,
    @DBUser() { id: userId }: User
  ) {
    return this.chatBotService.findManyCompanyChatBots(
      filterCompanyChatbotsDto,
      paginationDto,
      userId
    );
  }

  @Get('training-data/:id')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Retrieve training data content by id.',
    description: 'Fetches training data content by id.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Training data content successfully retrieved.',
  })
  async getTrainingDataContent(
    @Res() res: Response,
    @Param() { id }: MongoIdDto,
    @DBUser() { id: userId }: User
  ) {
    const fileStream = await this.chatBotService.getTrainingDataContent(
      id,
      userId
    );
    return fileStream.pipe(res);
  }

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
    type: FindManyChatBotsResponseEntity,
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
    type: UploadTrainingDataResponseEntity,
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

  @Post()
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Create a new fine tuning job.',
    description: 'Creates a new fine tuning job for the chatbot.',
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Fine tuning job successfully created.',
    type: CreateFineTuningJobResponseEntity,
  })
  @ApiFiles(['thumbnail'])
  create(
    @Body() createFineTuningJobDto: CreateFineTuningJobDto,
    @UploadedFiles()
    { thumbnail }: { thumbnail: Express.Multer.File[] },
    @DBUser() { id: companyId, accountType }: User
  ) {
    if (accountType !== 'COMPANY')
      throw new UnauthorizedException(
        'Only company accounts are allowed to create fine tuning jobs.'
      );
    return this.chatBotService.createFineTuningJob(
      { ...createFineTuningJobDto, thumbnail: thumbnail[0] },
      companyId
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Delete a chatbot.',
    description:
      'Deletes a chatbot and cancels any ongoing fine tuning jobs associated with it.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Chatbot successfully deleted.',
  })
  deleteChatBot(@Param() { id }: MongoIdDto, @DBUser() { id: userId }: User) {
    return this.chatBotService.delete(id, userId);
  }

  @Get('training-data')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Retrieve a list of training data.',
    description: 'Fetches a list of training data.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of training data successfully retrieved.',
    type: FindManyTrainingDataResponseEntity,
  })
  findManyTrainingData(
    @Query() paginationDto: PaginationDto,
    @DBUser() { id: userId }: User
  ) {
    return this.chatBotService.findManyTrainingData(paginationDto, userId);
  }

  @Post('init-chat')
  // @ApiBearerAuth()
  // @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Init chat.',
    description: 'Init chat.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Chat successfully initiated.',
  })
  initChat(
    @Body() { chatBotId, userId }: { chatBotId: string; userId: string }
  ) {
    return this.chatBotService.initChat(chatBotId, userId);
  }

  @Delete('training-data/:id')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Delete training data.',
    description: 'Deletes training data.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Training data successfully deleted.',
  })
  deleteTrainingData(
    @Param() { id }: MongoIdDto,
    @DBUser() { id: userId }: User
  ) {
    return this.chatBotService.deleteTrainingData(id, userId);
  }
}
