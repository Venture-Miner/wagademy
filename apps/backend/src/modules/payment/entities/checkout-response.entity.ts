import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';

export class CheckoutSessionEntity {
  @ApiProperty({ example: faker.internet.url() })
  stripeCheckoutSessionId: string;

  @ApiProperty({ example: faker.string.alphanumeric(50) })
  stripePublicKey: string;
}
