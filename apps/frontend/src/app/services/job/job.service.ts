import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from '../base-http/base-http.service';
import { Observable } from 'rxjs';
import {
  FilterJobs,
  FindManyJobsUserView,
  FindOneJobUserViewResponse,
  Pagination,
} from '@wagademy/types';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JobService extends BaseHttpService {
  constructor(private readonly http: HttpClient) {
    super();
  }

  findManyJobsUserView(
    filterJobsDto: FilterJobs,
    paginationDto: Pagination
  ): Observable<FindManyJobsUserView> {
    return this.http.get<FindManyJobsUserView>(
      `${this.URL}/job/jobs-user-view`,
      {
        params: { ...filterJobsDto, ...paginationDto },
      }
    );
  }

  findOneJobUserView(
    id: string
  ): Observable<FindOneJobUserViewResponse | null> {
    return this.http.get<FindOneJobUserViewResponse | null>(
      `${this.URL}/job/job-user-view/${id}`
    );
  }
}
