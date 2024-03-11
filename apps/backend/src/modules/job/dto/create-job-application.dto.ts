import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { CreateJobApplication } from '@wagademy/types';
import { IsMongoId } from 'class-validator';

export class CreateJobApplicationDto implements CreateJobApplication {
  @ApiProperty({
    example: faker.database.mongodbObjectId(),
    description: 'the ID of the job being applied',
  })
  @IsMongoId()
  jobId: string;
}
