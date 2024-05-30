import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { CompanyProfile } from '@wagademy/types';

export class CompanyProfileEntity implements CompanyProfile {
  @ApiProperty({ example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ example: faker.person.fullName() })
  name: string;

  @ApiProperty({ example: faker.lorem.text() })
  about: string;

  @ApiProperty({ example: faker.database.mongodbObjectId() })
  userId: string;

  @ApiProperty({ example: faker.lorem.word() })
  areaOfExpertise: string;

  @ApiProperty({ example: [faker.lorem.word()] })
  whatIsTheCompanyLookingFor: string[];

  @ApiProperty({ example: faker.internet.url() })
  companyPhoto: { url: string };

  @ApiProperty({ example: faker.internet.url() })
  backgroundPhoto: { url: string } | null;
}
