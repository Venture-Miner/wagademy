import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { CreateChatCompletion } from '@wagademy/types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatCompletionDto implements CreateChatCompletion {
  @ApiProperty({
    example: faker.lorem.text(),
    description: 'the message to create the chat completion',
  })
  @IsNotEmpty()
  @IsString()
  message: string;
}
