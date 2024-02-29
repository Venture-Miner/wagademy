import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { BuyCredits } from '@wagademy/types';
import { faker } from '@faker-js/faker';
import { Type } from 'class-transformer';

export class BuyCreditsDto implements BuyCredits {
  @ApiProperty({
    example: faker.number.int(),
    description: 'The total number of credits requested by the user.',
  })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 0 })
  totalCredits: number;

  @ApiProperty({
    example: faker.number.int(),
    description: 'The price per credit for the requested credits.',
  })
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty({
    example: faker.internet.url(),
    description:
      'The URL to which users will be redirected after completing their purchase on the Stripe payment page.',
  })
  @IsString()
  callbackUrl: string;
}
