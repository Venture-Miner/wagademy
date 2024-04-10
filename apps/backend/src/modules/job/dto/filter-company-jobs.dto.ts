import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { FilterCompanyJobs } from '@wagademy/types';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class FilterCompanyJobsDto implements FilterCompanyJobs {
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
    description: 'order job by number of applications',
    required: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  numberOfApplications?: boolean;

  @ApiProperty({
    example: faker.datatype.boolean(),
    description: 'order the job by number of views',
    required: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  jobViews?: boolean;

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
