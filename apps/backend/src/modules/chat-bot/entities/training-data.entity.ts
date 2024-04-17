import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { TrainingData } from '@prisma/client';

export class TrainingDataEntity implements TrainingData {
  @ApiProperty({ example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ example: faker.database.mongodbObjectId() })
  fileId: string;

  @ApiProperty({ example: faker.database.mongodbObjectId() })
  userId: string;
}
