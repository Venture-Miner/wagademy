import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import {
  AllocationEnum,
  CreateJob,
  EmploymentClassificationEnum,
  JobCompanyView,
  JobStatusEnum,
  Pagination,
  UpdateJob,
} from '@wagademy/types';
import { JobService } from '../../../services/job/job.service';
import { ToastService } from '../../../services/toast/toast.service';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  SelectComponent,
  SelectItem,
} from '../../../shared/components/select/select.component';
import { formatSelectItem } from '../../../shared/utils/functions/format-select-item';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  selector: 'wagademy-home-company',
  standalone: true,
  imports: [
    InputComponent,
    CardComponent,
    RouterModule,
    FormsModule,
    FormFieldComponent,
    ReactiveFormsModule,
    ModalComponent,
    SelectComponent,
    LoadingComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeCompanyComponent implements OnInit {
  jobs: JobCompanyView[] = [];
  isLoading = false;
  creatingStatus = {
    isCreating: false,
    isPublishing: false,
  };
  isUpdating = false;
  isRedirecting = false;
  isVerifying = false;
  selectedCardIndex: number | null = null;
  form = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    employmentClassification: ['', [Validators.required]],
    allocation: ['', [Validators.required]],
    jobStatus: [''],
  });
  employmentClassification: SelectItem<string>[] =
    formatSelectItem<EmploymentClassificationEnum>(
      EmploymentClassificationEnum
    );
  allocation: SelectItem<string>[] =
    formatSelectItem<AllocationEnum>(AllocationEnum);
  status: JobStatusEnum = JobStatusEnum.PUBLISHED;
  initialStatusValue: JobStatusEnum = JobStatusEnum.PUBLISHED;
  incompleteProfile = false;
  id = '';
  courses = [];
  selectedCardCourseIndex: number | null = null;
  skip = 0;
  take = 8;

  constructor(
    private readonly jobService: JobService,
    private toastService: ToastService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.findManyJobsCompanyView();
  }

  onCardCourseClick(index: number) {
    if (this.selectedCardCourseIndex === index) {
      this.selectedCardCourseIndex = null;
    } else {
      this.selectedCardCourseIndex = index;
    }
  }

  onCardClick(index: number) {
    if (this.selectedCardIndex === index) {
      this.selectedCardIndex = null;
    } else {
      this.selectedCardIndex = index;
    }
  }

  findManyJobsCompanyView() {
    const pagination: Pagination = { take: this.take, skip: this.skip };
    this.isLoading = true;
    this.jobService
      .findManyJobsCompanyView({ mostRecent: true }, pagination)
      .subscribe({
        next: ({ jobs }) => {
          this.jobs = jobs;
          this.isLoading = false;
        },
        error: ({ error }) => {
          this.isLoading = false;
          const message =
            error.statusCode !== 500
              ? error.message
              : 'Error while retrieving job applications';
          this.toastService.showToast({
            message,
            type: 'error',
          });
        },
      });
  }

  copyLink(id: string) {
    const currentUrl = window.location.href;

    const baseUrl = currentUrl.split('/').slice(0, 3).join('/');

    const link = `${baseUrl}/pages/job-details?id=${id}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        this.toastService.showToast({
          message: 'Link copied to clipboard!',
          type: 'success',
        });
      })
      .catch(() => {
        this.toastService.showToast({
          message: 'Failed to copy link to clipboard.',
          type: 'error',
        });
      });
  }

  redirectToJobInterviewSettingsPage(id: string) {
    this.router.navigate(['/pages/interview-questions'], {
      queryParams: { jobId: id },
    });
  }

  updateJobStatus(id: string, index: number) {
    this.isUpdating = true;
    this.toggleStatus();
    this.jobService.update(id, { jobStatus: this.status }).subscribe({
      next: () => {
        this.toastService.showToast({
          message:
            this.status === 'PUBLISHED'
              ? 'Success! Job successfully published'
              : 'Success! Job successfully unpublished.',
          type: 'success',
        });
        this.jobs[index].jobStatus = this.status;
        this.isUpdating = false;
      },
      error: () => {
        this.toastService.showToast({
          message:
            this.status === 'PUBLISHED'
              ? 'Error! while publishing Job'
              : 'Error while unpublishing Job.',
          type: 'error',
        });
        this.isUpdating = false;
      },
    });
  }

  publishJob() {
    this.toastService.showToast({
      message: 'Success! Job successfully published.',
      type: 'success',
    });
  }

  toggleStatus(): void {
    this.status = this.status === 'UNPUBLISHED' ? 'PUBLISHED' : 'UNPUBLISHED';
    if (this.initialStatusValue !== this.status) {
      this.form.markAsDirty();
    } else {
      this.form.markAsPristine();
    }
    this.form.controls.jobStatus.setValue(this.status);
  }

  deleteJob() {
    //TODO
  }

  openRemoveJobModal() {
    this.incompleteProfile = false;
    setTimeout(() => {
      // Trick to delay the operation until after the current call stack has cleared. This will give Angular time to update the DOM.
      window.modal['showModal']();
    }, 0);
  }

  updateJob() {
    const updateJob: UpdateJob = {
      ...(this.form.value as CreateJob),
    };
    this.isUpdating = true;
    this.jobService.update(this.id, updateJob).subscribe({
      next: () => {
        this.toastService.showToast({
          message: 'Success! Job successfully updated.',
          type: 'success',
        });
        this.isUpdating = false;
        this.resetForm();
        this.findManyJobsCompanyView();
        window.update_job['close']();
      },
      error: () => {
        this.toastService.showToast({
          message: 'Error while updating Job.',
          type: 'error',
        });
        this.isUpdating = false;
      },
    });
  }

  resetForm() {
    this.form.reset();
  }

  updateJobModal(job: JobCompanyView) {
    this.id = job.id;
    this.initialStatusValue = this.status = job.jobStatus;
    this.form.setValue({
      allocation: job.allocation,
      description: job.description,
      employmentClassification: job.employmentClassification,
      title: job.title,
      jobStatus: job.jobStatus,
    });
    window.update_job['showModal']();
  }
}
