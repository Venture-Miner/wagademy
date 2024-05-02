import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { File } from '@wagademy/types';

export class FileEntity implements File {
  @ApiProperty({ example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ example: faker.internet.url() })
  url: string;

  @ApiProperty({ example: faker.string.uuid() })
  key: string;

  @ApiProperty({ example: faker.date.past() })
  createdAt: Date;

  @ApiProperty({ example: faker.date.recent() })
  updatedAt: Date;
}
