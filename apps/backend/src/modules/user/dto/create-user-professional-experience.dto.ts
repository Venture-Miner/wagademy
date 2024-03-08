import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProfessionalExperience } from '@wagademy/types';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserProfessionalExperienceDto
  implements CreateProfessionalExperience
{
  @ApiProperty({
    description: 'the professional experience id',
    example: faker.database.mongodbObjectId(),
  })
  @IsOptional()
  @IsMongoId()
  id?: string;

  @ApiProperty({
    description: 'the company the user worked/work',
    example: faker.lorem.word(),
  })
  @IsNotEmpty()
  @IsString()
  company: string;

  @ApiProperty({
    description: 'the job title the user held or currently holds',
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
    description: 'indicates whether the user is currently employed in the job',
    example: faker.datatype.boolean(),
  })
  @IsBoolean()
  currentlyWorkingHere: boolean;

  @ApiProperty({
    example: faker.date.past(),
    description: 'the course start date',
    required: false,
  })
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @ApiProperty({
    example: faker.date.future(),
    description: 'the course end date',
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate?: Date | undefined;
}
