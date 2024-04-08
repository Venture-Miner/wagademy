import { ApiProperty } from '@nestjs/swagger';
import {
  FindManyJobApplicationsUserView,
  UserJobApplication,
} from '@wagademy/types';
import { JobApplicationUserViewEntity } from '../../../shared/entities';

export class FindManyJobApplicationsUserViewEntity
  implements FindManyJobApplicationsUserView
{
  @ApiProperty({ example: 1 })
  count: number;

  @ApiProperty({ example: 1 })
  countWithFilter: number;

  @ApiProperty({ type: [JobApplicationUserViewEntity] })
  jobApplications: UserJobApplication[];
}
