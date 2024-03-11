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
} from '@nestjs/common';
import { JobService } from './job.service';
import {
  CreateJobApplicationDto,
  CreateJobDto,
  FilterJobsDto,
  UpdateJobDto,
} from './dto';
import { MongoIdDto, PaginationDto } from '../../shared/dtos';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CognitoUserGuard } from '../../infra';
import { User } from '@wagademy/types';
import { DBUser } from '../../shared/decorators';
import { JobUserViewFindManyEntity } from './entities';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobService.create(createJobDto);
  }

  @Post('job-application')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Create a job application',
    description:
      'Creates a job application with the given cognito user and data.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The job application has been successfully created.',
  })
  createJobApplication(
    @DBUser()
    { id: userId }: User,
    @Body() createJobApplicationDto: CreateJobApplicationDto
  ) {
    return this.jobService.createJobApplication(
      createJobApplicationDto,
      userId
    );
  }

  @Get()
  findAll() {
    return this.jobService.findAll();
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
    // type: JobUserViewFindManyEntity,
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

  @Get(':id')
  findOne(@Param() { id }: MongoIdDto) {
    return this.jobService.findOne(id);
  }

  @Patch(':id')
  update(@Param() { id }: MongoIdDto, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param() { id }: MongoIdDto) {
    return this.jobService.remove(id);
  }
}
