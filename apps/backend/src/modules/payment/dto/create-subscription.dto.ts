import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';
import { CreateSubscription } from '@wagademy/types';
import { faker } from '@faker-js/faker';

export class CreateSubscriptionDto implements CreateSubscription {
  @ApiProperty({
    example: faker.internet.url(),
    description:
      'The URL to which users will be redirected after completing their purchase on the Stripe payment page.',
  })
  @IsString()
  callbackUrl: string;

  @ApiProperty({
    example: faker.database.mongodbObjectId(),
    description: 'The ID of the plan associated with the subscription.',
  })
  @IsMongoId()
  planId: string;
}
