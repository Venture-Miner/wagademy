import { FindManyChatBotsResponse } from '@wagademy/types';
import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { ChatbotEntity } from './chat-bot.entity';

export class FindManyChatBotsResponseEntity
  implements FindManyChatBotsResponse
{
  @ApiProperty({ type: [ChatbotEntity] })
  chatBots: ChatbotEntity[];

  @ApiProperty({ example: faker.number.int() })
  count: number;
}
