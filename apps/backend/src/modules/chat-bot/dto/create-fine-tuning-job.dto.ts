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
    description: 'training data ID',
    example: faker.string.uuid(),
  })
  @IsString()
  trainingDataId: string;
}
