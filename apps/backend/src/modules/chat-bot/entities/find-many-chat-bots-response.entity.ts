import {
  FindManyChatBotsResponse,
  FindOneChatBotResponse,
} from '@wagademy/types';
import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';

export class FindManyChatBotsResponseEntity
  implements FindManyChatBotsResponse
{
  chatBots: FindOneChatBotResponse[];
  @ApiProperty({ example: faker.number.int() })
  count: number;

  @ApiProperty({ example: faker.database.mongodbObjectId() })
  fineTuningJobId: string;
}
