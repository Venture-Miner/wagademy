import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { NgClass } from '@angular/common';
import { ApplicationsCardsComponent } from '../../../shared/components/applications-cards/applications-cards.component';
import { Pagination, UserJobApplication } from '@wagademy/types';
import { JobService } from '../../../services/job/job.service';
import { ToastService } from '../../../services/toast/toast.service';
import { Subject, debounceTime } from 'rxjs';

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
export class JobApplicationsAllComponent implements OnInit, OnDestroy {
  private manageTabClickSubject = new Subject<void>();
  private subscription;
  applicationsType: 'all' | 'interviewInvites' = 'all';
  page = { interviewInvites: 1, all: 1 };
  count = { interviewInvites: 0, all: 0 };
  take = 8;
  jobApplications: {
    all: UserJobApplication[];
    interviewInvites: UserJobApplication[];
  } = { all: [], interviewInvites: [] };
  isLoading = false;
  id = '';
  constructor(
    private readonly jobService: JobService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.subscription = this.manageTabClickSubject
      .pipe(debounceTime(600))
      .subscribe(() => {
        this.getJobApplications();
      });
  }

  ngOnInit(): void {
    this.getJobApplications();
  }

  getJobApplications() {
    const pagination: Pagination = {
      take: this.take,
      skip: (this.page[this.applicationsType] - 1) * this.take,
    };
    const filter = this.applicationsType === 'all' ? {} : { invited: true };
    const oppositeApplicationType =
      this.applicationsType === 'all' ? 'interviewInvites' : 'all';
    this.jobService
      .findManyJobApplicationsUserView(filter, pagination)
      .subscribe({
        next: ({ count, jobApplications, countWithFilter }) => {
          this.count[this.applicationsType] = count;
          this.jobApplications[this.applicationsType] = jobApplications;
          this.count[oppositeApplicationType] = countWithFilter;
        },
        error: () => {
          this.toastService.showToast({
            message: 'Error while retrieving job applications.',
            type: 'error',
          });
        },
      });
  }

  manageTabClick() {
    this.manageTabClickSubject.next();
  }

  openModal(id: string) {
    this.id = id;
    window.modal['showModal']();
  }

  goToAiInterview() {
    this.isLoading = true;
    this.router.navigate(['/pages/gptchat'], {
      queryParams: { id: this.id },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
