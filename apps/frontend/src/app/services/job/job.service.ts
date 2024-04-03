import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from '../base-http/base-http.service';
import { Observable } from 'rxjs';
import {
  CreateJob,
  CreateJobApplication,
  CreateJobApplicationResponse,
  CreateJobResponse,
  FilterCompanyJobs,
  FilterJobs,
  FindManyJobsCompanyView,
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

  create(createJobDto: CreateJob): Observable<CreateJobResponse> {
    return this.http.post<CreateJobResponse>(
      `${this.URL}/job/job-application`,
      createJobDto
    );
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

  findManyJobsCompanyView(
    filterCompanyJobsDto: FilterCompanyJobs,
    paginationDto: Pagination
  ): Observable<FindManyJobsCompanyView> {
    return this.http.get<FindManyJobsCompanyView>(`${this.URL}/job`, {
      params: { ...filterCompanyJobsDto, ...paginationDto },
    });
  }

  findOneJobUserView(
    id: string
  ): Observable<FindOneJobUserViewResponse | null> {
    return this.http.get<FindOneJobUserViewResponse | null>(
      `${this.URL}/job/job-user-view/${id}`
    );
  }
}
