import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { CreateEducation } from '@wagademy/types';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserEducationDto implements CreateEducation {
  @ApiProperty({
    description: 'the education id',
    example: faker.database.mongodbObjectId(),
  })
  @IsOptional()
  @IsMongoId()
  id?: string;

  @ApiProperty({
    description: 'the institution the user studied/study',
    example: faker.lorem.word(),
  })
  @IsNotEmpty()
  @IsString()
  institution: string;

  @ApiProperty({
    description: 'the course the user studied/study',
    example: faker.lorem.word(),
  })
  @IsNotEmpty()
  @IsString()
  course: string;

  @ApiProperty({
    description: 'the degree level',
    example: faker.lorem.word(),
  })
  @IsNotEmpty()
  @IsString()
  degree: string;

  @ApiProperty({
    description: 'description about the course',
    example: faker.lorem.text(),
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'indicates whether the user is still studying the course',
    example: faker.datatype.boolean(),
  })
  @IsBoolean()
  stillStudying: boolean;

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
