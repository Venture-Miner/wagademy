import { ApiProperty } from '@nestjs/swagger';
import {
  FindManyJobApplicationsCompanyView,
  JobApplicationCompanyView,
} from '@wagademy/types';
import { JobApplicationCompanyViewEntity } from '../../../shared/entities';

export class FindManyJobApplicationsCompanyViewEntity
  implements FindManyJobApplicationsCompanyView
{
  @ApiProperty({ example: 1 })
  count: number;

  @ApiProperty({ type: [JobApplicationCompanyViewEntity] })
  jobApplications: JobApplicationCompanyView[];
}
