import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
  AllocationEnum,
  JobStatusEnum,
  JobTypeEnum,
  JobUserView,
  UserJobApplication,
} from '@wagademy/types';
import { JobApplicationUserViewEntity } from './job-application-user-view.entity';

export class JobUserViewEntity implements JobUserView {
  @ApiProperty({ example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ example: faker.lorem.text })
  title: string;

  @ApiProperty({ example: faker.lorem.word() })
  description: string;

  @ApiProperty({ example: JobTypeEnum.FULL_TIME })
  jobType: JobTypeEnum;

  @ApiProperty({ example: AllocationEnum.REMOTE })
  allocation: AllocationEnum;

  @ApiProperty({ example: null })
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

  @ApiProperty({ example: faker.date.past() })
  jobStatus: JobStatusEnum;

  @ApiProperty({ example: faker.date.past() })
  createdAt: Date;

  @ApiProperty({ example: faker.date.past() })
  updatedAt: Date;
}
