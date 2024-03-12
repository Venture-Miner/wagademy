import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
  AllocationEnum,
  EmploymentClassificationEnum,
  JobCompanyView,
  JobStatusEnum,
} from '@wagademy/types';

export class JobCompanyViewEntity implements JobCompanyView {
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

  @ApiProperty({ example: [faker.lorem.word()] })
  aiInterviewQuestions: string[];

  @ApiProperty({ example: faker.number.int() })
  views: number;

  @ApiProperty({ example: { jobApplications: faker.number.int() } })
  _count: { jobApplications: number };

  @ApiProperty({ example: JobStatusEnum.PUBLISHED })
  jobStatus: JobStatusEnum;

  @ApiProperty({ example: faker.date.past() })
  createdAt: Date;

  @ApiProperty({ example: faker.date.past() })
  updatedAt: Date;
}
