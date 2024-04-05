import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from '../base-http/base-http.service';
import { Observable } from 'rxjs';
import {
  CreateJobApplication,
  CreateJobApplicationResponse,
  FilterJobs,
  FilterUserJobApplications,
  FindManyJobApplicationsUserView,
  FindManyJobsUserView,
  FindOneJobUserViewResponse,
  JobUserView,
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

  createJobApplication(
    createJobApplicationDto: CreateJobApplication
  ): Observable<CreateJobApplicationResponse> {
    return this.http.post<CreateJobApplicationResponse>(
      `${this.URL}/job/job-application`,
      createJobApplicationDto
    );
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

  findManyJobApplicationsUserView(
    filterUserJobApplicationsDto: FilterUserJobApplications,
    paginationDto: Pagination
  ): Observable<FindManyJobApplicationsUserView> {
    return this.http.get<FindManyJobApplicationsUserView>(
      `${this.URL}/job/user-job-applications/`,
      {
        params: { ...filterUserJobApplicationsDto, ...paginationDto },
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

  updateViews(id: string): Observable<JobUserView> {
    return this.http.patch<JobUserView>(`${this.URL}/job/job-view/${id}`, {});
  }
}
