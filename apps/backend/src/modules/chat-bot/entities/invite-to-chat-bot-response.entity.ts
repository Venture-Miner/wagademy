import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { InviteToChatBotResponse } from '@wagademy/types';

export class InviteToChatBotResponseEntity implements InviteToChatBotResponse {
  @ApiProperty({ example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ example: faker.database.mongodbObjectId() })
  chatBotId: string;

  @ApiProperty({ example: faker.database.mongodbObjectId() })
  userId: string;
}
