import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { FilterChatbots } from '@wagademy/types';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class FilterChatbotsDto implements FilterChatbots {
  @ApiProperty({
    example: faker.datatype.boolean(),
    description:
      'the chatbots in which the user has been invited to participate',
    required: false,
  })
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  @IsBoolean()
  invited?: boolean;

  @ApiProperty({
    example: faker.datatype.boolean(),
    description: 'the featured chatbots',
    required: false,
  })
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiProperty({
    example: faker.datatype.boolean(),
    description: 'the most recently posted chatbots',
    required: false,
  })
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  @IsBoolean()
  mostRecent?: boolean;

  @ApiProperty({
    example: faker.lorem.text(),
    description: 'search term used to find titles',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;
}
