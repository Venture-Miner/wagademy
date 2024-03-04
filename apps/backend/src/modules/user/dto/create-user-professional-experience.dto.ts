import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProfessionalExperience } from '@wagademy/types';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserProfessionalExperienceDto
  implements CreateProfessionalExperience
{
  @ApiProperty({
    description: 'the company the user worked/work',
    example: faker.lorem.word(),
  })
  @IsNotEmpty()
  @IsString()
  company: string;

  @ApiProperty({
    description: 'the job title the user worked/work',
    example: faker.lorem.word(),
  })
  @IsNotEmpty()
  @IsString()
  jobTitle: string;

  @ApiProperty({
    description: 'description about the job',
    example: faker.lorem.text(),
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'information about the job if the user stills working',
    example: faker.datatype.boolean(),
  })
  @IsBoolean()
  currentlyWorkingHere: boolean;

  @ApiProperty({
    example: faker.date.past(),
    description: 'The course start date.',
    required: false,
  })
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @ApiProperty({
    example: faker.date.future(),
    description: 'The course end date.',
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate?: Date | undefined;
}
