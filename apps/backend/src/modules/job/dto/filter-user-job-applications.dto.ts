import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { FilterUserJobApplications } from '@wagademy/types';
import { IsBoolean, IsOptional } from 'class-validator';

export class FilterUserJobApplicationsDto implements FilterUserJobApplications {
  @ApiProperty({
    example: faker.datatype.boolean(),
    description: 'list the job applications with status INVITED',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  invited?: boolean;
}
