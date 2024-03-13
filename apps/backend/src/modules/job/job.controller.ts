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
  InviteToInterviewEntity,
  JobCompanyViewFindManyEntity,
  JobCompanyViewFindOneEntity,
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
        'Only accounts where the type is company can create a job.'
      );
    return this.jobService.create(createJobDto, companyId);
  }

  @Post('job-application')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Create a job application',
    description:
      'Creates a job application with the given cognito user and data.',
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'The job application has been successfully created.',
    type: CreateJobApplicationResponseEntity,
  })
  createJobApplication(
    @DBUser()
    { id: userId, accountType }: User,
    @Body() createJobApplicationDto: CreateJobApplicationDto
  ) {
    if (accountType !== 'PHYSICAL_PERSON')
      throw new UnauthorizedException(
        'Only accounts where the type is physical person can apply to a job.'
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
    summary: 'Get a list of jobs of a company.',
    description:
      'Get a list of job available with some filter options and company ID.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The list of jobs have been successfully retrieved.',
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
    summary:
      'Retrieve a list of job applications submitted for positions at the company.',
    description:
      'Retrieve a list of job applications submitted for positions at the company with some filter options and company ID.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'The list of job applications have been successfully retrieved.',
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

  @Get('jobs-user-view')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Get a list of available jobs.',
    description: 'Get a list of job available with some filter options.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: JobUserViewFindManyEntity,
    description: 'The list of jobs have been successfully retrieved.',
  })
  findManyJobsUserView(
    @Query() filterJobsDto: FilterJobsDto,
    @Query() paginationDto: PaginationDto,
    @DBUser()
    { id: userId }: User
  ) {
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
    summary: 'Get a job.',
    description: 'Get a job by it own ID.',
  })
  @ApiResponse({
    type: JobCompanyViewFindOneEntity,
    status: HttpStatus.OK,
    description: 'Jobs has been successfully retrieved.',
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

  @Get('job-user-view/:id')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Get a job.',
    description: 'Get a job by it own ID.',
  })
  @ApiResponse({
    type: JobUserViewFindOneEntity,
    status: HttpStatus.OK,
    description: 'Jobs has been successfully retrieved.',
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
        'Only accounts where the type is company can update a job.'
      );
    return this.jobService.update(id, updateJobDto, userId);
  }

  @Patch('job-view/:id')
  @ApiOperation({
    summary: 'Update a job views',
    description: 'Updates a job views with provided ID.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Job views successfully updated.',
    type: JobUserViewUpdateEntity,
  })
  updateViews(@Param() { id }: MongoIdDto) {
    return this.jobService.updateViews(id);
  }

  @Patch('invite-to-interview/:id')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Invite an user to interview',
    description: 'Invites an user to be interviewed with job application ID.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Invite successfully done.',
    type: InviteToInterviewEntity,
  })
  inviteToInterview(
    @Param() { id }: MongoIdDto,
    @DBUser()
    { id: userId, accountType }: User
  ) {
    if (accountType !== 'COMPANY')
      throw new UnauthorizedException(
        'Only accounts where the type is company can update invite to an interview.'
      );
    return this.jobService.inviteToInterview(id, userId);
  }

  @Patch('configure-ai-questions/:id')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Configure AI questions for one job',
    description:
      'Configure AI questions for one job with job ID and provided questions.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ai questions successfully configured.',
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
        'Only accounts where the type is company can update invite to an interview.'
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
