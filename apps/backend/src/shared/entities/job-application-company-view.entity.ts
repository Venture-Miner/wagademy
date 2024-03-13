import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
  JobApplicationCompanyView,
  JobApplicationStatusEnum,
} from '../../../../../libs/types/src';

export class JobApplicationCompanyViewEntity
  implements JobApplicationCompanyView
{
  @ApiProperty({ example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({
    example: {
      userProfile: {
        id: faker.database.mongodbObjectId(),
        name: faker.lorem.word(),
        profilePhoto: null,
        about: faker.lorem.text(),
      },
    },
  })
  user: {
    userProfile: {
      id: string;
      name: string;
      profilePhoto: { url: string } | null;
      about: string;
    } | null;
  };

  @ApiProperty({
    example: {
      id: faker.database.mongodbObjectId(),
      title: faker.lorem.word(),
    },
  })
  job: { id: string; title: string };

  @ApiProperty({ example: JobApplicationStatusEnum.SUBSCRIBED })
  applicationStatus: JobApplicationStatusEnum;

  @ApiProperty({ example: faker.date.past() })
  createdAt: Date;

  @ApiProperty({ example: faker.date.past() })
  updatedAt: Date;
}
