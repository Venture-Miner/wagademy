import { ApiProperty } from '@nestjs/swagger';
import { FindManyPlansResponse, Plan } from '@wagademy/types';
import { PlanEntity } from '../../../shared/entities';

export class FindManyPlansResponseEntity implements FindManyPlansResponse {
  @ApiProperty({ type: [PlanEntity] })
  plans: Plan[];

  @ApiProperty({ example: 1 })
  count: number;
}
