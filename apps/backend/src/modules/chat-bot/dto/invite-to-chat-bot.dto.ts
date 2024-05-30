import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { InviteToChatBot } from '@wagademy/types';
import { IsString } from 'class-validator';

export class InviteToChatBotDto implements InviteToChatBot {
  @ApiProperty({
    description: 'id of the chatbot to invite the user to participate in',
    example: faker.database.mongodbObjectId(),
  })
  @IsString()
  chatBotId: string;

  @ApiProperty({
    description: 'id of the user to invite to participate in the chatbot',
    example: faker.database.mongodbObjectId(),
  })
  @IsString()
  userId: string;
}
