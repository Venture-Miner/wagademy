import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { ConfigureAIQuestions } from '@wagademy/types';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ConfigureAIQuestionsDto implements ConfigureAIQuestions {
  @ApiProperty({
    example: [faker.lorem.text(), faker.lorem.text()],
    description:
      'configure AI questions to interview users invited to interview',
  })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      value = value.split(',');
    }
    if (!Array.isArray(value)) value = [value];
    return value;
  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  aiInterviewQuestions: string[];
}
