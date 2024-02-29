import { Pagination } from '@wagademy/types';
import { faker } from '@faker-js/faker';

export const pagination: Pagination = {
  skip: faker.number.int(),
  take: faker.number.int(),
};
