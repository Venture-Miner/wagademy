import { Credit, GetUserCurrentCreditsResponse } from '@wagademy/types';
import { ApiProperty } from '@nestjs/swagger';
import { CreditEntity } from './credits.entity';
import { faker } from '@faker-js/faker';

export class GetUserCurrentCreditsResponseEntity
  implements GetUserCurrentCreditsResponse
{
  private static total = faker.number.int({ min: 1000, max: 5000 });
  private static totalUsed = faker.number.int({ max: this.total });

  @ApiProperty({ type: [CreditEntity] })
  userPlanCredits: Credit[];

  @ApiProperty({
    example: {
      total: GetUserCurrentCreditsResponseEntity.total,
      totalUsed: GetUserCurrentCreditsResponseEntity.totalUsed,
    },
  })
  userOnDemandCredits: { total: number; totalUsed: number };
}
