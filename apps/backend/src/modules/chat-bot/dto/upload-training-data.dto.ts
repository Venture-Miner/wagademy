import { ApiProperty } from '@nestjs/swagger';
import { UploadTrainingData } from '@wagademy/types';
import { IsOptional } from 'class-validator';

export class UploadTrainingDataDto implements UploadTrainingData {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'training data file in json format',
  })
  @IsOptional()
  trainingData: Express.Multer.File;
}
