import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
  CreateEducation,
  CreateProfessionalExperience,
  CreateProfile,
} from '@wagademy/types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateUserEducationDto } from './create-user-education.dto';
import { CreateUserProfessionalExperienceDto } from './create-user-professional-experience.dto';

export class CreateProfileDto implements CreateProfile {
  @ApiProperty({ description: 'user name', example: faker.person.fullName() })
  @IsString()
  name: string;

  @ApiProperty({ description: 'user email', example: faker.internet.email() })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'user cellphone number',
    example: faker.phone.number(),
  })
  @IsPhoneNumber()
  contactNumber: string;

  @ApiProperty({
    description: 'user country',
    example: faker.location.country(),
  })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({
    description: 'user country',
    example: faker.date.past({ years: 30 }),
  })
  @Type(() => Date)
  @IsDate()
  dateOfBirth: Date;

  @ApiProperty({
    description: 'user state',
    example: faker.location.state(),
  })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({
    description: 'about the user',
    example: faker.lorem.text(),
  })
  @IsNotEmpty()
  @IsString()
  about: string;

  @ApiProperty({
    description: 'user education',
    type: [CreateUserEducationDto],
  })
  @Type(() => CreateUserEducationDto)
  @ValidateNested()
  education: CreateEducation[];

  @ApiProperty({
    description: 'users professional experience',
    type: [CreateUserProfessionalExperienceDto],
  })
  @Type(() => CreateUserProfessionalExperienceDto)
  @ValidateNested()
  professionalExperience: CreateProfessionalExperience[];

  @ApiProperty({
    description: 'user areas of expertise',
    example: [faker.lorem.word()],
  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  areasOfExpertise: string[];

  @ApiProperty({
    description: 'user skills and competencies',
    example: [faker.lorem.word()],
  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  skillsAndCompetencies: string[];

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'profile photo as FormData.',
  })
  profilePhoto: Express.Multer.File[];
}
