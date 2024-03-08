import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Education } from '@wagademy/types';

export class UserEducationEntity implements Education {
  @ApiProperty({ example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ example: faker.lorem.word() })
  institution: string;

  @ApiProperty({ example: faker.lorem.word() })
  course: string;

  @ApiProperty({ example: faker.lorem.word() })
  degree: string;

  @ApiProperty({ example: faker.lorem.text() })
  description: string | null;

  @ApiProperty({ example: faker.datatype.boolean() })
  stillStudying: boolean;

  @ApiProperty({ example: faker.date.past() })
  startDate: Date;

  @ApiProperty({ example: faker.date.future() })
  endDate: Date | null;

  @ApiProperty({ example: faker.database.mongodbObjectId() })
  userProfileId: string | null;
}
