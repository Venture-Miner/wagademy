import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { FilterCompanyJobApplications } from '@wagademy/types';
import { Type } from 'class-transformer';
import { IsBoolean, IsMongoId, IsOptional, IsString } from 'class-validator';

export class FilterCompanyJobApplicationsDto
  implements FilterCompanyJobApplications
{
  @ApiProperty({
    example: faker.lorem.word(),
    description:
      'search by job name or the name of the user applied to the job',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string | undefined;

  @ApiProperty({
    example: faker.datatype.boolean(),
    description: 'list the job applications with status INVITED',
    required: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  invited?: boolean;

  @ApiProperty({
    example: faker.datatype.boolean(),
    description: 'list the job applications with status INTERVIEWED',
    required: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  interviewed?: boolean;

  @ApiProperty({
    example: faker.datatype.boolean(),
    description: 'the most recently posted job applications',
    required: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  mostRecent?: boolean;

  @ApiProperty({
    example: faker.database.mongodbObjectId(),
    description: 'the ID of the job',
  })
  @IsOptional()
  @IsMongoId()
  jobId?: string;
}
