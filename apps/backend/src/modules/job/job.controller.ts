import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobApplicationDto, CreateJobDto, UpdateJobDto } from './dto';
import { MongoIdDto } from '../../shared/dtos';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CognitoUserGuard } from '../../infra';
import { User } from '@wagademy/types';
import { DBUser } from '../../shared/decorators';

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
