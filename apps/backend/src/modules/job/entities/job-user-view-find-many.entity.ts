import { ApiProperty } from '@nestjs/swagger';
import { FindManyJobsUserView, JobUserView } from '@wagademy/types';
import { JobUserViewEntity } from '../../../shared/entities';

export class JobUserViewFindManyEntity implements FindManyJobsUserView {
  @ApiProperty({ example: 1 })
  count: number;

  @ApiProperty({ type: [JobUserViewEntity] })
  jobs: JobUserView[];
}
