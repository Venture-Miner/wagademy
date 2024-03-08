import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProfile } from '@wagademy/types';
import { Transform, Type, plainToInstance } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
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
  @Transform(
    ({ value }) => {
      if (typeof value === 'string') {
        value = value.replace(/}\s*{/g, '},{');
        value = `[${value}]`;
        value = JSON.parse(value);
        return plainToInstance(CreateUserEducationDto, value);
      }
      if (!Array.isArray(value)) value = [value];
      return plainToInstance(CreateUserEducationDto, value);
    },
    { toClassOnly: true }
  )
  @IsArray()
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  education: CreateUserEducationDto[];

  @ApiProperty({
    description: 'users professional experience',
    type: [CreateUserProfessionalExperienceDto],
  })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      value = value.replace(/}\s*{/g, '},{');
      value = `[${value}]`;
      value = JSON.parse(value);
      return plainToInstance(CreateUserProfessionalExperienceDto, value);
    }
    if (!Array.isArray(value)) value = [value];
    return plainToInstance(CreateUserProfessionalExperienceDto, value);
  })
  @IsArray()
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  professionalExperience: CreateUserProfessionalExperienceDto[];

  @ApiProperty({
    description: 'user areas of expertise',
    example: [faker.lorem.word()],
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
  areasOfExpertise: string[];

  @ApiProperty({
    description: 'user skills and competencies',
    example: [faker.lorem.word()],
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
  skillsAndCompetencies: string[];

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'profile photo as FormData',
  })
  @IsOptional()
  profilePhoto?: Express.Multer.File[];
}
