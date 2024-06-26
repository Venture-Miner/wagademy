import { AccountTypeEnum, CreateUserResponse } from '@wagademy/types';
import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponseEntity implements CreateUserResponse {
  @ApiProperty({ example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ example: faker.internet.userName() })
  name: string;

  @ApiProperty({ example: faker.internet.email() })
  email: string;

  @ApiProperty({ example: faker.string.uuid() })
  idRefAuth: string;

  @ApiProperty({ example: null })
  walletAddress: string | null;

  @ApiProperty({ example: AccountTypeEnum.COMPANY })
  accountType: AccountTypeEnum;

  @ApiProperty({ example: null })
  companyProfile: { id: string } | null;

  @ApiProperty({ example: null })
  userProfile: { id: string } | null;

  @ApiProperty({ example: null })
  subscriptionId: string | null;

  @ApiProperty({ example: false })
  hasChangedPlan: boolean;
}
