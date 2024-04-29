import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { UploadTrainingData } from '@wagademy/types';
import { IsOptional, IsString } from 'class-validator';

export class UploadTrainingDataDto implements UploadTrainingData {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'training data file in json format',
  })
  @IsOptional()
  trainingData: Express.Multer.File;

  @ApiProperty({
    description: 'title of training data',
    example: faker.database.mongodbObjectId(),
  })
  @IsString()
  title: string;
}
