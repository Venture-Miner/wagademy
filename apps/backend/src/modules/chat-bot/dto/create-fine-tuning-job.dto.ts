import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { CreateFineTuningJob } from '@wagademy/types';
import { IsString } from 'class-validator';

export class CreateFineTuningJobDto implements CreateFineTuningJob {
  @ApiProperty({ description: 'job name', example: faker.lorem.text() })
  @IsString()
  title: string;

  @ApiProperty({ description: 'job description', example: faker.lorem.text() })
  @IsString()
  description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'thumbnail image for the chatbot',
  })
  thumbnail: Express.Multer.File;

  @ApiProperty({
    description: 'id of the training data to be used for fine-tuning',
    example: faker.database.mongodbObjectId(),
  })
  @IsString()
  trainingDataId: string;
}
