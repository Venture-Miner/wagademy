import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { FilterChatbots } from '@wagademy/types';
import { IsBoolean, IsOptional } from 'class-validator';

export class FilterChatbotsDto implements FilterChatbots {
  @ApiProperty({
    example: faker.datatype.boolean(),
    description:
      'the chatbots in which the user has been invited to participate',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  invited?: boolean;

  @ApiProperty({
    example: faker.datatype.boolean(),
    description: 'the featured chatbots',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiProperty({
    example: faker.datatype.boolean(),
    description: 'the most recently posted chatbots',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  mostRecent?: boolean;
}
