import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';

export class CountEntity {
  @ApiProperty({ example: faker.number.int({ min: 0, max: 15 }) })
  count: number;
}
