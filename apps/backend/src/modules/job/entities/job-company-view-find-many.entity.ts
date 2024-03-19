import { ApiProperty } from '@nestjs/swagger';
import { FindManyJobsCompanyView, JobCompanyView } from '@wagademy/types';
import { JobCompanyViewEntity } from '../../../shared/entities';

export class JobCompanyViewFindManyEntity implements FindManyJobsCompanyView {
  @ApiProperty({ example: 1 })
  count: number;

  @ApiProperty({ type: [JobCompanyViewEntity] })
  jobs: JobCompanyView[];
}
