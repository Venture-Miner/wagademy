import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { GetStripeCustomerPortal } from '@wagademy/types';
import { faker } from '@faker-js/faker';

export class StripeCustomerPortalDto implements GetStripeCustomerPortal {
  @ApiProperty({
    example: faker.internet.url(),
    description:
      'This is the URL where users will be redirected after they finish making changes on the Stripe customer portal page.',
  })
  @IsString()
  callbackUrl: string;
}
