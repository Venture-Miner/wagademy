import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { GetJobInterviewResultResponse } from '@wagademy/types';
import { JobCompanyViewEntity } from '../../../shared/entities';

class UserProfile {
  @ApiProperty({ example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ example: faker.internet.userName() })
  name: string;

  @ApiProperty({ example: faker.internet.email() })
  email: string;

  @ApiProperty({ example: { url: faker.internet.url() } })
  profilePhoto: { url: string } | null;

  @ApiProperty({ example: faker.phone.number() })
  contactNumber: string;
}

class User {
  @ApiProperty({ type: UserProfile })
  userProfile: UserProfile | null;
}

class JobApplication {
  @ApiProperty({ type: User })
  user: User;

  @ApiProperty({ type: JobCompanyViewEntity })
  job: JobCompanyViewEntity;
}

export class JobInterviewResultEntity implements GetJobInterviewResultResponse {
  @ApiProperty({ example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({
    example: [{ role: 'assistant', content: faker.lorem.paragraphs(5) }],
  })
  history: any;

  @ApiProperty({
    type: JobApplication,
  })
  jobApplication: {
    user: {
      userProfile: {
        id: string;
        name: string;
        email: string;
        profilePhoto: { url: string } | null;
        contactNumber: string;
      } | null;
    };
    job: JobCompanyViewEntity;
  };
}
