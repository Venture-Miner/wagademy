import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { NgClass } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApplicationsJobCardComponent } from '../../../shared/components/applications-job-card/applications-job-card.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { InputSearchComponent } from '../../../shared/components/input-search/input-search.component';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';
import {
  FilterCompanyJobApplications,
  JobApplicationCompanyView,
  Pagination,
} from '@wagademy/types';
import { JobService } from '../../../services/job/job.service';
import { ToastService } from '../../../services/toast/toast.service';

interface Filter {
  name: string;
  symbol: 'all' | 'invited' | 'mostRecent' | 'interviewed';
}

@Component({
  selector: 'wagademy-applications-job',
  standalone: true,
  imports: [
    InputComponent,
    RouterModule,
    FormsModule,
    NgClass,
    ApplicationsJobCardComponent,
    PaginationComponent,
    InputSearchComponent,
    BackButtonComponent,
  ],
  templateUrl: './applications-job.component.html',
  styleUrl: './applications-job.component.scss',
})
export class ApplicationsJobComponent implements OnInit {
  jobApplications: JobApplicationCompanyView[] = [];
  jobId = '';
  jobTitle = '';
  selectedFilter: 'all' | 'interviewed' | 'mostRecent' | 'invited' = 'all';
  filters: Filter[] = [
    { name: 'All', symbol: 'all' },
    { name: 'Most recent', symbol: 'mostRecent' },
    { name: 'Invited', symbol: 'invited' },
    { name: 'Interviewed', symbol: 'interviewed' },
  ];
  page = 1;
  take = 8;
  count = 0;
  searchJob = '';

  constructor(
    private readonly jobService: JobService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const jobId = params.get('jobId');
      if (jobId) this.jobId = jobId;
    });
    this.listJobApplications();
  }

  filterJobApplicationsDto() {
    const filter: FilterCompanyJobApplications = {};
    if (this.selectedFilter !== 'all') filter[this.selectedFilter] = true;
    if (this.searchJob) filter.search = this.searchJob;
    if (this.jobId) filter.jobId = this.jobId;
    return filter;
  }

  listJobApplications() {
    const pagination: Pagination = {
      take: this.take,
      skip: (this.page - 1) * this.take,
    };
    const filter = this.filterJobApplicationsDto();
    this.jobService
      .findManyJobApplicationsCompanyView(filter, pagination)
      .subscribe({
        next: ({ count, jobApplications }) => {
          this.count = count;
          this.jobApplications = jobApplications;
          this.jobTitle = jobApplications[0].job.title;
        },
        error: () => {
          this.toastService.showToast({
            message: 'Error while retrieving job applications',
            type: 'error',
          });
        },
      });
  }
}
