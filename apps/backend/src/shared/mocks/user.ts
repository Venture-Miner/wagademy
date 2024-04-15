import { AccountTypeEnum, User } from '@wagademy/types';
import { faker } from '@faker-js/faker';

export const user: User = {
  id: faker.database.mongodbObjectId(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  idRefAuth: faker.string.uuid(),
  accountType: AccountTypeEnum.PHYSICAL_PERSON,
  walletAddress: null,
  companyProfile: null,
  userProfile: null,
};
