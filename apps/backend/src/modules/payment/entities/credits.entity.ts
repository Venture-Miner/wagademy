import { Credit, CreditTypeEnum } from '@wagademy/types';
import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';

export class CreditEntity implements Credit {
  private static total = faker.number.int({ min: 1000, max: 5000 });
  private static totalUsed = faker.number.int({ max: this.total });

  @ApiProperty({ example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ example: CreditEntity.total })
  total: number;

  @ApiProperty({ example: CreditEntity.totalUsed })
  totalUsed: number;

  @ApiProperty({ example: null })
  expireOn: Date;

  @ApiProperty({ example: CreditTypeEnum.ON_DEMAND_CREDIT })
  creditType: CreditTypeEnum;

  @ApiProperty({ example: faker.database.mongodbObjectId() })
  userId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
