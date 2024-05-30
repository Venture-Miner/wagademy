import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { UploadTrainingDataResponse } from '@wagademy/types';

export class UploadTrainingDataResponseEntity
  implements UploadTrainingDataResponse
{
  @ApiProperty({ example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ example: faker.database.mongodbObjectId() })
  fileId: string;

  @ApiProperty({ example: faker.database.mongodbObjectId() })
  userId: string;

  @ApiProperty({ example: faker.lorem.text() })
  title: string;
}
