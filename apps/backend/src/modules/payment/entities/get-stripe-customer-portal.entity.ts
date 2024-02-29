import { GetStripeCustomerPortalResponse } from '@wagademy/types';
import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';

export class GetStripeCustomerPortalResponseEntity
  implements GetStripeCustomerPortalResponse
{
  @ApiProperty({ example: faker.internet.url() })
  stripeBillingSessionId: string;

  @ApiProperty({ example: faker.string.alphanumeric(50) })
  stripePublicKey: string;
}
