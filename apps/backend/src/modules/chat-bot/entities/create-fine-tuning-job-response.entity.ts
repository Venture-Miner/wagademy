import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
  ChatBotStatusEnum,
  CreateFineTuningJobResponse,
  File,
} from '@wagademy/types';
import { FileEntity } from '../../../shared/entities/file.entity';

export class CreateFineTuningJobResponseEntity
  implements CreateFineTuningJobResponse
{
  @ApiProperty({ example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ example: faker.database.mongodbObjectId() })
  fineTuningJobId: string;

  @ApiProperty({ example: faker.lorem.text() })
  title: string;

  @ApiProperty({ example: faker.lorem.text() })
  description: string;

  @ApiProperty({ example: faker.database.mongodbObjectId() })
  userId: string;

  @ApiProperty({ example: ChatBotStatusEnum.PROCESSING })
  status: ChatBotStatusEnum;

  @ApiProperty({ example: faker.number.int() })
  views: number;

  @ApiProperty({ example: faker.database.mongodbObjectId() })
  thumbnailId: string;

  @ApiProperty({ type: FileEntity })
  thumbnail: File;

  @ApiProperty({ example: faker.datatype.boolean() })
  disabled: boolean;

  @ApiProperty({ example: faker.date.recent() })
  createdAt: Date;
}
