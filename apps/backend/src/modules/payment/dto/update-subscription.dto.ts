import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsMongoId } from 'class-validator';

export class UpdateSubscriptionDto {
  @ApiProperty({
    example: faker.database.mongodbObjectId(),
    description: 'The ID of the plan associated with the subscription.',
  })
  @IsMongoId()
  planId: string;
}
