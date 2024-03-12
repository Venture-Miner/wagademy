import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCompanyProfile } from '@wagademy/types';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCompanyProfileDto implements CreateCompanyProfile {
  @ApiProperty({
    description: 'company name',
    example: faker.person.fullName(),
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'company country',
    example: faker.lorem.word(),
  })
  @IsNotEmpty()
  @IsString()
  areaOfExpertise: string;

  @ApiProperty({
    description: 'about the company',
    example: faker.lorem.text(),
  })
  @IsNotEmpty()
  @IsString()
  about: string;

  @ApiProperty({
    description: 'what is the company looking for',
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
  whatIsTheCompanyLookingFor: string[];

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'company profile photo as FormData',
    required: false,
  })
  @IsOptional()
  companyPhoto?: Express.Multer.File[];
}
