import {
  AccountTypeEnum,
  CognitoUserAttributes,
  FindOneUserResponse,
} from '@wagademy/types';
import { faker } from '@faker-js/faker';

export const payload: CognitoUserAttributes = {
  email: faker.internet.email(),
  sub: faker.string.uuid(),
  nickname: faker.internet.userName(),
};

export const dbUser: FindOneUserResponse = {
  id: faker.database.mongodbObjectId(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  idRefAuth: faker.string.uuid(),
  subscriptionId: faker.string.uuid(),
  hasChangedPlan: false,
  accountType: AccountTypeEnum.COMPANY,
  walletAddress: null,
  companyProfile: null,
  userProfile: null,
};
