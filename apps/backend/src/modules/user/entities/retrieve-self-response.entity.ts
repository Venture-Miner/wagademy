import { RetrieveSelfResponse } from '@wagademy/types';
import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';

export class RetrieveSelfResponseEntity implements RetrieveSelfResponse {
  @ApiProperty({ example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ example: faker.internet.userName() })
  name: string;

  @ApiProperty({ example: faker.internet.email() })
  email: string;

  @ApiProperty({ example: faker.string.uuid() })
  idRefAuth: string;
}
