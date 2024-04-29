import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  AllocationEnum,
  EmploymentClassificationEnum,
  JobUserView,
} from '@wagademy/types';
import { JobService } from '../../services/job/job.service';
import { ToastService } from '../../services/toast/toast.service';
import { formatEnumKeys } from '../../shared/utils/functions/format-enum';
import { UserService } from '../../services/user/user.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { NgOptimizedImage } from '@angular/common';
import { BackButtonComponent } from '../../shared/components/back-button/back-button.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'wagademy-jobs-details',
  standalone: true,
  imports: [
    RouterModule,
    ModalComponent,
    BackButtonComponent,
    NgOptimizedImage,
    LoadingComponent,
  ],
  templateUrl: './jobs-details.component.html',
  styleUrl: './jobs-details.component.scss',
})
export class JobsDetailsComponent implements OnInit {
  id = '';
  job: JobUserView | null = null;
  applied = false;
  isVerifying = false;
  employmentClassification = '';
  allocation = '';
  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly jobService: JobService,
    private toastService: ToastService,
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const id = params.get('id');
      if (id) this.id = id;
    });
    this.findOneJob();
    this.updateJobViews();
  }

  updateJobViews() {
    this.jobService.updateViews(this.id).subscribe({
      next: () => {},
    });
  }

  completeProfile() {
    this.router.navigate(['/pages/create-profile']);
  }

  validateIfUserIsAbleToApply() {
    this.isVerifying = true;
    this.userService.self().subscribe({
      next: (user) => {
        this.isVerifying = false;
        if (!user?.userProfile) {
          window.modal['showModal']();
        } else this.createJobApplication();
      },
      error: () => {
        this.isVerifying = false;
        this.toastService.showToast({
          message: 'Error while verifying user.',
          type: 'error',
        });
      },
    });
  }

  findOneJob() {
    this.isLoading = true;
    this.jobService.findOneJobUserView(this.id).subscribe({
      next: (job) => {
        if (job) {
          job.description = job?.description.replace(/\n/g, '<br>');
        }
        this.job = job;
        this.applied = job?.jobApplications?.length === 1;
        this.employmentClassification =
          formatEnumKeys<EmploymentClassificationEnum>(
            job?.employmentClassification as EmploymentClassificationEnum
          ) as string;
        this.allocation = formatEnumKeys<AllocationEnum>(
          job?.allocation as AllocationEnum
        ) as string;
        this.isLoading = false;
      },
      error: () => {
        this.toastService.showToast({
          message: 'Error while retrieving job',
          type: 'error',
        });
      },
    });
  }

  createJobApplication() {
    this.jobService.createJobApplication({ jobId: this.id }).subscribe({
      next: () => {
        this.applied = true;
        this.toastService.showToast({
          message: 'Success! You have applied for this position.',
          type: 'success',
        });
      },
      error: ({ error }) => {
        const message =
          error.statusCode !== 500
            ? error.message
            : 'Error while applying to job';
        this.toastService.showToast({
          message,
          type: 'error',
        });
      },
    });
  }
}
