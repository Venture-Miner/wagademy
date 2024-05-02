import { Plan, PlanTypeEnum } from '@wagademy/types';
import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';

export class PlanEntity implements Plan {
  @ApiProperty({ example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ example: faker.lorem.word() })
  name: string;

  @ApiProperty({ example: faker.finance.currency().code })
  currency: string;

  @ApiProperty({ example: faker.commerce.price() })
  price: number;

  @ApiProperty({
    example: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
  })
  metadata: string[];

  @ApiProperty({ example: faker.number.int({ max: 5000 }) })
  credits: number;

  @ApiProperty({ example: faker.number.int({ max: 50 }) })
  quantityOfMailboxes: number;

  @ApiProperty({ example: faker.string.uuid() })
  priceId: string;

  @ApiProperty({ example: PlanTypeEnum.PHYSICAL_PERSON })
  planType: PlanTypeEnum;
}
