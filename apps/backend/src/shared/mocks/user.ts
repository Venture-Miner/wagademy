import { User } from '@wagademy/types';
import { faker } from '@faker-js/faker';

export const user: User = {
  id: faker.database.mongodbObjectId(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  idRefAuth: faker.string.uuid(),
  subscriptionId: faker.string.uuid(),
  planId: faker.database.mongodbObjectId(),
  hasChangedPlan: false,
};
