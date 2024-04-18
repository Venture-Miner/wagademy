import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { CreateChatBotCompletion } from '@wagademy/types';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateChatBotCompletionDto implements CreateChatBotCompletion {
  @ApiProperty({
    example: faker.database.mongodbObjectId(),
    description: 'the chat bot id to create the chat completion',
  })
  @IsMongoId()
  chatBotId: string;

  @ApiProperty({
    example: faker.lorem.text(),
    description: 'the message to create the chat completion',
  })
  @IsNotEmpty()
  @IsString()
  message: string;
}
