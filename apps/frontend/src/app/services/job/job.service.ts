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
  FilterUserJobApplications,
  FindManyJobApplicationsUserView,
  FindManyJobsUserView,
  FindOneJobUserViewResponse,
  JobUserView,
  Pagination,
  UpdateJob,
  UpdateJobResponse,
  FindManyJobApplicationsCompanyView,
  FilterCompanyJobApplications,
  FindOneJobApplicationCompanyView,
  GetJobInterviewResultResponse,
  ConfigureAIQuestions,
  FindOneJobCompanyViewResponse,
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
    return this.http.post<CreateJobResponse>(`${this.URL}/job`, createJobDto);
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

  findManyJobApplicationsUserView(
    filterUserJobApplicationsDto: FilterUserJobApplications,
    paginationDto: Pagination
  ): Observable<FindManyJobApplicationsUserView> {
    return this.http.get<FindManyJobApplicationsUserView>(
      `${this.URL}/job/user-job-applications`,
      {
        params: { ...filterUserJobApplicationsDto, ...paginationDto },
      }
    );
  }

  findManyJobApplicationsCompanyView(
    filterCompanyJobApplicationsDto: FilterCompanyJobApplications,
    paginationDto: Pagination
  ): Observable<FindManyJobApplicationsCompanyView> {
    return this.http.get<FindManyJobApplicationsCompanyView>(
      `${this.URL}/job/job-applications`,
      {
        params: { ...filterCompanyJobApplicationsDto, ...paginationDto },
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

  findOneJobApplicationCompanyView(
    id: string
  ): Observable<FindOneJobApplicationCompanyView | null> {
    return this.http.get<FindOneJobApplicationCompanyView | null>(
      `${this.URL}/job/job-application/${id}`
    );
  }

  findOneJobCompanyView(
    id: string
  ): Observable<FindOneJobCompanyViewResponse | null> {
    return this.http.get<FindOneJobCompanyViewResponse | null>(
      `${this.URL}/job/job-company-view/${id}`
    );
  }

  getJobInterviewResult(
    id: string
  ): Observable<GetJobInterviewResultResponse | null> {
    return this.http.get<GetJobInterviewResultResponse | null>(
      `${this.URL}/job/job-interview-result/${id}`
    );
  }

  update(id: string, updateJobDto: UpdateJob): Observable<UpdateJobResponse> {
    return this.http.patch<UpdateJobResponse>(
      `${this.URL}/job/${id}`,
      updateJobDto
    );
  }

  configureAIQuestions(
    id: string,
    configureAIQuestionsDto: ConfigureAIQuestions
  ): Observable<UpdateJobResponse> {
    return this.http.patch<UpdateJobResponse>(
      `${this.URL}/job/configure-ai-questions/${id}`,
      configureAIQuestionsDto
    );
  }

  inviteToInterview(id: string): Observable<UpdateJobResponse> {
    return this.http.patch<UpdateJobResponse>(
      `${this.URL}/job/invite-to-interview/${id}`,
      {}
    );
  }

  updateViews(id: string): Observable<JobUserView> {
    return this.http.patch<JobUserView>(`${this.URL}/job/job-view/${id}`, {});
  }
}
