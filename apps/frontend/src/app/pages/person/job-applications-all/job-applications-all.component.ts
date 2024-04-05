import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { NgClass } from '@angular/common';
import { ApplicationsCardsComponent } from '../../../shared/components/applications-cards/applications-cards.component';
import {
  FilterUserJobApplications,
  Pagination,
  UserJobApplication,
} from '@wagademy/types';
import { JobService } from '../../../services/job/job.service';
import { forkJoin } from 'rxjs';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'wagademy-job-applications-all',
  standalone: true,
  imports: [
    RouterModule,
    ModalComponent,
    PaginationComponent,
    NgClass,
    ApplicationsCardsComponent,
  ],
  templateUrl: './job-applications-all.component.html',
  styleUrl: './job-applications-all.component.scss',
})
export class JobApplicationsAllComponent implements OnInit {
  applicationsType: 'all' | 'interviewInvites' = 'all';
  page = { interviewInvites: 1, all: 1 };
  count = { interviewInvites: 0, all: 0 };
  take = 8;
  jobApplications: {
    all: UserJobApplication[];
    interviewInvites: UserJobApplication[];
  } = { all: [], interviewInvites: [] };

  constructor(
    private readonly jobService: JobService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getJobApplicationsOnInit();
  }

  getJobApplications() {
    const pagination: Pagination = {
      take: this.take,
      skip: (this.page[this.applicationsType] - 1) * this.take,
    };
    const filter = this.applicationsType === 'all' ? {} : { invited: true };
    this.jobService
      .findManyJobApplicationsUserView(filter, pagination)
      .subscribe({
        next: ({ count, jobApplications }) => {
          this.count[this.applicationsType] = count;
          this.jobApplications[this.applicationsType] = jobApplications;
        },
      });
  }

  getJobApplicationsOnInit() {
    const filters: FilterUserJobApplications[] = [{}, { invited: true }];
    const pagination: Pagination = {
      take: this.take,
      skip: 0,
    };
    const combinedRequests = filters.map((filters) =>
      this.jobService.findManyJobApplicationsUserView(filters, pagination)
    );
    forkJoin(combinedRequests).subscribe({
      next: (responses) => {
        this.jobApplications.all = responses[0].jobApplications;
        this.count.all = responses[0].count;
        this.count.interviewInvites = responses[1].count;
        this.jobApplications.interviewInvites = responses[1].jobApplications;
      },
      error: () => {
        this.toastService.showToast({
          message: 'Error while retrieving job applications.',
          type: 'error',
        });
      },
    });
  }

  openModal() {
    console.log('hello');
    // window.modal['showModal']();
  }
}
