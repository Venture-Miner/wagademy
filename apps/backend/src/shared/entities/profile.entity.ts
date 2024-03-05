import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
  Education,
  ProfessionalExperience,
  UserProfile,
} from '@wagademy/types';
import { UserEducationEntity } from './user-education.entity';
import { UserProfessionalExperienceEntity } from './user-professional-experience.entity';

export class ProfileEntity implements UserProfile {
  @ApiProperty({ example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ example: faker.person.fullName() })
  name: string;

  @ApiProperty({ example: faker.internet.email() })
  email: string;

  @ApiProperty({ example: faker.date.past({ years: 30 }) })
  dateOfBirth: Date;

  @ApiProperty({ example: faker.phone.number() })
  contactNumber: string;

  @ApiProperty({ example: faker.location.country() })
  country: string;

  @ApiProperty({ example: faker.location.state() })
  state: string;

  @ApiProperty({ example: faker.lorem.text() })
  about: string;

  @ApiProperty({ example: faker.database.mongodbObjectId() })
  userId: string;

  @ApiProperty({ type: [UserEducationEntity] })
  education: Education[];

  @ApiProperty({ type: [UserProfessionalExperienceEntity] })
  professionalExperience: ProfessionalExperience[];

  @ApiProperty({ example: [faker.lorem.word()] })
  areasOfExpertise: string[];

  @ApiProperty({ example: [faker.lorem.word()] })
  skillsAndCompetencies: string[];

  @ApiProperty({ example: faker.internet.url() })
  profilePhoto: { url: string };
}
