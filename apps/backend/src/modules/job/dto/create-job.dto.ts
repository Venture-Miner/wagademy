import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
  AllocationEnum,
  CreateJob,
  EmploymentClassificationEnum,
  JobStatusEnum,
} from '@wagademy/types';
import { IsEnum, IsString } from 'class-validator';

export class CreateJobDto implements CreateJob {
  @ApiProperty({ description: 'job name', example: faker.lorem.text() })
  @IsString()
  title: string;

  @ApiProperty({ description: 'job description', example: faker.lorem.text() })
  @IsString()
  description: string;

  @ApiProperty({
    example: EmploymentClassificationEnum.CONTRACT,
    description: 'the job employment classification',
    enum: EmploymentClassificationEnum,
  })
  @IsEnum(EmploymentClassificationEnum)
  employmentClassification: EmploymentClassificationEnum;

  @ApiProperty({
    example: AllocationEnum.HYBRID,
    description: 'the job allocation type',
    enum: AllocationEnum,
  })
  @IsEnum(AllocationEnum)
  allocation: AllocationEnum;

  @ApiProperty({
    example: JobStatusEnum.PUBLISHED,
    description: 'the job status',
    enum: JobStatusEnum,
  })
  @IsEnum(JobStatusEnum)
  jobStatus: JobStatusEnum;
}
