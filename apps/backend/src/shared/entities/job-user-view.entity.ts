import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
  AllocationEnum,
  JobStatusEnum,
  EmploymentClassificationEnum,
  JobUserView,
  UserJobApplication,
} from '@wagademy/types';
import { JobApplicationUserViewEntity } from './job-application-user-view.entity';

export class JobUserViewEntity implements JobUserView {
  @ApiProperty({ example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ example: faker.lorem.text() })
  title: string;

  @ApiProperty({ example: faker.lorem.word() })
  description: string;

  @ApiProperty({ example: EmploymentClassificationEnum.FULL_TIME })
  employmentClassification: EmploymentClassificationEnum;

  @ApiProperty({ example: AllocationEnum.REMOTE })
  allocation: AllocationEnum;

  @ApiProperty({ example: { company: { companyProfile: null } } })
  company: {
    companyProfile: {
      id: string;
      name: string;
      about: string;
      companyPhoto: { url: string } | null;
    } | null;
  };

  @ApiProperty({ type: [JobApplicationUserViewEntity] })
  jobApplications: UserJobApplication[];

  @ApiProperty({ example: JobStatusEnum.PUBLISHED })
  jobStatus: JobStatusEnum;

  @ApiProperty({ example: faker.date.past() })
  createdAt: Date;

  @ApiProperty({ example: faker.date.past() })
  updatedAt: Date;
}
