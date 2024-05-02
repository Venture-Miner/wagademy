import { ApiProperty } from '@nestjs/swagger';
import { ChatBotStatusEnum, FilterCompanyChatbots } from '@wagademy/types';
import { IsEnum, IsOptional } from 'class-validator';

export class FilterCompanyChatBotsDto implements FilterCompanyChatbots {
  @ApiProperty({
    example: ChatBotStatusEnum.PROCESSING,
    description: 'the status of the chatbot',
    enum: ChatBotStatusEnum,
  })
  @IsOptional()
  @IsEnum(ChatBotStatusEnum)
  status?: ChatBotStatusEnum;
}
