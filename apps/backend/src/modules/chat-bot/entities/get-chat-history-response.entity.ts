import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { GetChatBotHistoryResponse } from '@wagademy/types';

export class GetChatBotHistoryResponseEntity
  implements GetChatBotHistoryResponse
{
  @ApiProperty({ example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({
    example: [{ role: 'assistant', content: faker.lorem.paragraphs(5) }],
  })
  history: any;

  @ApiProperty({ example: faker.database.mongodbObjectId() })
  userId: string;

  @ApiProperty({ example: faker.database.mongodbObjectId() })
  chatBotId: string;
}
