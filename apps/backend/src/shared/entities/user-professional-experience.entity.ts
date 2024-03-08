import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { ProfessionalExperience } from '@wagademy/types';

export class UserProfessionalExperienceEntity
  implements ProfessionalExperience
{
  @ApiProperty({ example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ example: faker.lorem.word() })
  company: string;

  @ApiProperty({ example: faker.lorem.word() })
  jobTitle: string;

  @ApiProperty({ example: faker.lorem.text() })
  description: string | null;

  @ApiProperty({ example: faker.database.mongodbObjectId() })
  userProfileId: string | null;

  @ApiProperty({ example: faker.datatype.boolean() })
  currentlyWorkingHere: boolean;

  @ApiProperty({ example: faker.date.past() })
  startDate: Date;

  @ApiProperty({ example: faker.date.future() })
  endDate: Date | null;
}
