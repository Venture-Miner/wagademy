import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  AllocationEnum,
  EmploymentClassificationEnum,
  JobUserView,
} from '@wagademy/types';
import { JobService } from '../../services/job/job.service';
import { ToastService } from '../../services/toast/toast.service';
import { formatEnumKeys } from '../../shared/utils/functions/format-enum';

@Component({
  selector: 'wagademy-jobs-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './jobs-details.component.html',
  styleUrl: './jobs-details.component.scss',
})
export class JobsDetailsComponent implements OnInit {
  id = '';
  job: JobUserView | null = null;
  applied = false;
  employmentClassification = '';
  allocation = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly jobService: JobService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const id = params.get('id');
      if (id) this.id = id;
    });
    this.findOneJob();
  }

  findOneJob() {
    this.jobService.findOneJobUserView(this.id).subscribe({
      next: (job) => {
        this.job = job;
        this.applied = job?.jobApplications?.length === 1;
        this.employmentClassification =
          formatEnumKeys<EmploymentClassificationEnum>(
            job?.employmentClassification as EmploymentClassificationEnum
          ) as string;
        this.allocation = formatEnumKeys<AllocationEnum>(
          job?.allocation as AllocationEnum
        ) as string;
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
          message: 'Successful job application!',
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
