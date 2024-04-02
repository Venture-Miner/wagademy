import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { FilterJobs } from '@wagademy/types';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class FilterJobsDto implements FilterJobs {
  @ApiProperty({
    example: faker.lorem.word(),
    description: 'search job by name',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string | undefined;

  @ApiProperty({
    example: faker.datatype.boolean(),
    description: 'the top featured jobs',
    required: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  featured?: boolean;

  @ApiProperty({
    example: faker.datatype.boolean(),
    description: 'the most recently posted jobs',
    required: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  mostRecent?: boolean;
}
