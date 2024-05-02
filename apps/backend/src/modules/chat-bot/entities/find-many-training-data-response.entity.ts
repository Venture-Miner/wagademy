import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { FindManyTrainingDataResponse } from '@wagademy/types';
import { TrainingDataEntity } from './training-data.entity';

export class FindManyTrainingDataResponseEntity
  implements FindManyTrainingDataResponse
{
  @ApiProperty({ type: [TrainingDataEntity] })
  trainingData: TrainingDataEntity[];

  @ApiProperty({ example: faker.number.int() })
  count: number;
}
