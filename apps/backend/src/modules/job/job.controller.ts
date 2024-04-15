import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { JobService } from './job.service';
import {
  ConfigureAIQuestionsDto,
  CreateJobApplicationDto,
  CreateJobDto,
  FilterCompanyJobApplicationsDto,
  FilterCompanyJobsDto,
  FilterJobsDto,
  FilterUserJobApplicationsDto,
  UpdateJobDto,
} from './dto';
import { MongoIdDto, PaginationDto } from '../../shared/dtos';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CognitoUserGuard } from '../../infra';
import { User } from '@wagademy/types';
import { DBUser } from '../../shared/decorators';
import {
  CreateJobApplicationResponseEntity,
  CreateJobResponseEntity,
  FindManyJobApplicationsCompanyViewEntity,
  FindManyJobApplicationsUserViewEntity,
  InviteToInterviewEntity,
  JobCompanyViewFindManyEntity,
  JobCompanyViewFindOneEntity,
  JobInterviewResultEntity,
  JobUserViewFindManyEntity,
  JobUserViewFindOneEntity,
  JobUserViewUpdateEntity,
  UpdateJobResponseEntity,
} from './entities';

@ApiTags('Job')
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Create a new job',
    description: 'Creates a new job with provided details.',
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Job successfully created.',
    type: CreateJobResponseEntity,
  })
  create(
    @Body() createJobDto: CreateJobDto,
    @DBUser()
    { id: companyId, accountType }: User
  ) {
    if (accountType !== 'COMPANY')
      throw new UnauthorizedException(
        'Only company accounts are allowed to create jobs.'
      );
    return this.jobService.create(createJobDto, companyId);
  }

  @Post('job-application')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Create a job application',
    description: 'Creates a job application with the given user data.',
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Job application submitted successfully.',
    type: CreateJobApplicationResponseEntity,
  })
  createJobApplication(
    @DBUser()
    { id: userId, accountType }: User,
    @Body() createJobApplicationDto: CreateJobApplicationDto
  ) {
    if (accountType !== 'PHYSICAL_PERSON')
      throw new UnauthorizedException(
        'Only individual accounts are allowed to apply for jobs.'
      );
    return this.jobService.createJobApplication(
      createJobApplicationDto,
      userId
    );
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Retrieve a list of jobs belonging to a company.',
    description:
      'Fetches a list of available jobs with optional filters, based on the provided company ID.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of jobs successfully retrieved.',
    type: JobCompanyViewFindManyEntity,
  })
  findManyJobsCompanyView(
    @Query() filterCompanyJobsDto: FilterCompanyJobsDto,
    @Query() paginationDto: PaginationDto,
    @DBUser()
    { id: userId, accountType }: User
  ) {
    if (accountType !== 'COMPANY')
      throw new UnauthorizedException('You are not able to access this.');
    return this.jobService.findManyJobsCompanyView(
      filterCompanyJobsDto,
      paginationDto,
      userId
    );
  }

  @Get('job-applications')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Retrieve a list of job applications submitted to the company.',
    description:
      'Fetches a list of job applications submitted to the company with optional filters, based on the provided company ID.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of job applications successfully retrieved.',
    type: FindManyJobApplicationsCompanyViewEntity,
  })
  findManyJobApplicationsCompanyView(
    @Query() filterCompanyJobApplicationsDto: FilterCompanyJobApplicationsDto,
    @Query() paginationDto: PaginationDto,
    @DBUser()
    { id: userId, accountType }: User
  ) {
    if (accountType !== 'COMPANY')
      throw new UnauthorizedException('You are not able to access this.');
    return this.jobService.findManyJobApplicationsCompanyView(
      filterCompanyJobApplicationsDto,
      paginationDto,
      userId
    );
  }

  @Get('user-job-applications')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Retrieve a list of job applications submitted by the user.',
    description:
      'Fetches a list of job applications submitted by the user with optional filters, based on the provided company ID.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of job applications successfully retrieved.',
    type: FindManyJobApplicationsUserViewEntity,
  })
  findManyJobApplicationsUserView(
    @Query() filterUserJobApplicationsDto: FilterUserJobApplicationsDto,
    @Query() paginationDto: PaginationDto,
    @DBUser()
    { id: userId, accountType }: User
  ) {
    if (accountType !== 'PHYSICAL_PERSON')
      throw new UnauthorizedException('You are not able to access this.');
    return this.jobService.findManyJobApplicationsUserView(
      filterUserJobApplicationsDto,
      paginationDto,
      userId
    );
  }

  @Get('jobs-user-view')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Retrieve a list of available jobs',
    description: 'Fetches a list of available jobs with optional filters.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: JobUserViewFindManyEntity,
    description: 'List of jobs successfully retrieved.',
  })
  findManyJobsUserView(
    @Query() filterJobsDto: FilterJobsDto,
    @Query() paginationDto: PaginationDto,
    @DBUser()
    { id: userId, accountType }: User
  ) {
    if (accountType !== 'PHYSICAL_PERSON')
      throw new UnauthorizedException('You are not able to access this.');
    return this.jobService.findManyJobsUserView(
      filterJobsDto,
      paginationDto,
      userId
    );
  }

  @Get('job-company-view/:id')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Retrieve a job',
    description: 'Fetches a job based on its unique ID.',
  })
  @ApiResponse({
    type: JobCompanyViewFindOneEntity,
    status: HttpStatus.OK,
    description: 'Job successfully retrieved.',
  })
  findOneJobCompanyView(
    @Param() { id }: MongoIdDto,
    @DBUser()
    { id: userId, accountType }: User
  ) {
    if (accountType !== 'COMPANY')
      throw new UnauthorizedException('You are not able to access this.');
    return this.jobService.findOneJobCompanyView(id, userId);
  }

  @Get('job-interview-result/:id')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Get a job interview result.',
    description: 'Get a job interview result by it own ID.',
  })
  @ApiResponse({
    type: JobInterviewResultEntity,
    status: HttpStatus.OK,
    description: 'Jobs interview result has been successfully retrieved.',
  })
  getJobInterviewResult(
    @Param() { id }: MongoIdDto,
    @DBUser()
    { id: userId, accountType }: User
  ) {
    if (accountType !== 'COMPANY')
      throw new UnauthorizedException('You are not able to access this.');
    return this.jobService.getJobInterviewResult(id, userId);
  }

  @Get('job-application/:id')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Get a job application.',
    description: 'Get a job application by it own ID.',
  })
  @ApiResponse({
    type: JobInterviewResultEntity,
    status: HttpStatus.OK,
    description: 'Jobs application has been successfully retrieved.',
  })
  findOneJobApplicationCompanyView(
    @Param() { id }: MongoIdDto,
    @DBUser()
    { accountType }: User
  ) {
    if (accountType !== 'COMPANY')
      throw new UnauthorizedException('You are not able to access this.');
    return this.jobService.findOneJobApplicationCompanyView(id);
  }

  @Get('job-user-view/:id')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Retrieve a job',
    description: 'Fetches a job based on its unique ID.',
  })
  @ApiResponse({
    type: JobUserViewFindOneEntity,
    status: HttpStatus.OK,
    description: 'Job successfully retrieved.',
  })
  findOneJobUserView(
    @Param() { id }: MongoIdDto,
    @DBUser()
    { id: userId }: User
  ) {
    return this.jobService.findOneJobUserView(id, userId);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Update a new job',
    description: 'Updates a new job with provided details.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Job successfully updated.',
    type: UpdateJobResponseEntity,
  })
  update(
    @Param() { id }: MongoIdDto,
    @Body() updateJobDto: UpdateJobDto,
    @DBUser()
    { id: userId, accountType }: User
  ) {
    if (accountType !== 'COMPANY')
      throw new UnauthorizedException(
        'Only company accounts are permitted to update a job.'
      );
    return this.jobService.update(id, updateJobDto, userId);
  }

  @Patch('job-view/:id')
  @ApiOperation({
    summary: 'Update a job view count',
    description: 'Updates a job view count based on its unique ID.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Job view count successfully updated.',
    type: JobUserViewUpdateEntity,
  })
  updateViews(@Param() { id }: MongoIdDto) {
    return this.jobService.updateViews(id);
  }

  @Patch('invite-to-interview/:id')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Invite a user to interview',
    description:
      'Sends an invitation to a user for an interview using the job application ID.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Invitation successfully sent.',
    type: InviteToInterviewEntity,
  })
  inviteToInterview(
    @Param() { id }: MongoIdDto,
    @DBUser()
    { id: userId, accountType }: User
  ) {
    if (accountType !== 'COMPANY')
      throw new UnauthorizedException(
        'Only company accounts are permitted to send interview invitations.'
      );
    return this.jobService.inviteToInterview(id, userId);
  }

  @Patch('configure-ai-questions/:id')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Configure AI questions for a job',
    description:
      'Configures AI questions for a job using the job ID and provided questions.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'AI questions successfully configured.',
    type: InviteToInterviewEntity,
  })
  configureAIQuestions(
    @Param() { id }: MongoIdDto,
    @Body() configureAIQuestionsDto: ConfigureAIQuestionsDto,
    @DBUser()
    { id: userId, accountType }: User
  ) {
    if (accountType !== 'COMPANY')
      throw new UnauthorizedException(
        'Only company accounts are permitted to configure AI questions for a job.'
      );
    return this.jobService.configureAIQuestions(
      id,
      userId,
      configureAIQuestionsDto
    );
  }

  @Delete(':id')
  remove(@Param() { id }: MongoIdDto) {
    return this.jobService.remove(id);
  }
}
