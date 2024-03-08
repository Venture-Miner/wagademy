import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
  CreateJobApplication,
  JobApplicationStatusEnum,
} from '@wagademy/types';
import { IsEnum, IsMongoId } from 'class-validator';

export class CreateJobApplicationDto implements CreateJobApplication {
  @ApiProperty({
    example: faker.database.mongodbObjectId(),
    description: 'the ID of the job being applied',
  })
  @IsMongoId()
  jobId: string;

  @ApiProperty({
    example: faker.database.mongodbObjectId(),
    description: 'ID belonging to the user applying for the job',
  })
  @IsMongoId()
  userId: string;

  @ApiProperty({
    enum: JobApplicationStatusEnum,
    example: JobApplicationStatusEnum.SUBSCRIBED,
    description: 'job application status',
  })
  @IsEnum(JobApplicationStatusEnum)
  applicationStatus: JobApplicationStatusEnum;
}
