import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { JobApplicationStatusEnum, UserJobApplication } from '@wagademy/types';

export class JobApplicationUserViewEntity implements UserJobApplication {
  @ApiProperty({ example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({
    example: {
      company: { name: faker.company.name() },
      title: faker.lorem.word(),
    },
  })
  job: { company: { name: string }; title: string };

  @ApiProperty({ example: JobApplicationStatusEnum.SUBSCRIBED })
  applicationStatus: JobApplicationStatusEnum;

  @ApiProperty({ example: faker.date.past() })
  createdAt: Date;

  @ApiProperty({ example: faker.date.past() })
  updatedAt: Date;
}
