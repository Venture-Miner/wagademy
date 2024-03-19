import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
  ChatCompletionMessage,
  ChatCompletionMessageToolCall,
  FunctionCall,
} from '@wagademy/types';

export class ChatCompletionMessageEntity implements ChatCompletionMessage {
  @ApiProperty({ example: faker.lorem.text() })
  content: string | null;

  @ApiProperty({ example: 'assistant' })
  role: 'assistant';

  @ApiProperty()
  function_call?: FunctionCall | undefined;

  @ApiProperty()
  tool_calls?: ChatCompletionMessageToolCall[] | undefined;
}
