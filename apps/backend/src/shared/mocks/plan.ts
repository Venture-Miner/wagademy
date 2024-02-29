import { Plan } from '@wagademy/types';
import { faker } from '@faker-js/faker';

export const plan: Plan = {
  id: faker.database.mongodbObjectId(),
  name: faker.commerce.product(),
  currency: faker.finance.currencyCode(),
  price: faker.number.int({ min: 0, max: 100 }),
  metadata: [faker.lorem.word()],
  credits: faker.number.int({ min: 0, max: 5000 }),
  quantityOfMailboxes: faker.number.int({ min: 0, max: 50 }),
  priceId: faker.string.uuid(),
};
