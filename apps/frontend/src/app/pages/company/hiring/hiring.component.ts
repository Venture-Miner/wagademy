import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { NgClass } from '@angular/common';
import { CardJobComponent } from '../../../shared/components/card-job/card-job.component';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import {
  SelectComponent,
  SelectItem,
} from '../../../shared/components/select/select.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { ToastService } from '../../../services/toast/toast.service';
import {
  AllocationEnum,
  CreateJob,
  EmploymentClassificationEnum,
  FilterCompanyJobs,
  JobCompanyView,
  JobStatusEnum,
  Pagination,
  UpdateJob,
} from '@wagademy/types';
import { JobService } from '../../../services/job/job.service';
import { formatSelectItem } from '../../../shared/utils/functions/format-select-item';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { InputSearchComponent } from '../../../shared/components/input-search/input-search.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

interface Filter {
  name: string;
  symbol: 'all' | 'numberOfApplications' | 'mostRecent' | 'jobViews';
}

@Component({
  selector: 'wagademy-hiring',
  standalone: true,
  imports: [
    CardJobComponent,
    NgClass,
    FormsModule,
    PaginationComponent,
    InputComponent,
    FormFieldComponent,
    ReactiveFormsModule,
    SelectComponent,
    ModalComponent,
    InputSearchComponent,
    LoadingComponent,
  ],
  templateUrl: './hiring.component.html',
  styleUrl: './hiring.component.scss',
})
export class HiringComponent implements OnInit {
  jobs: JobCompanyView[] = [];
  isLoading = false;
  creatingStatus = {
    isCreating: false,
    isPublishing: false,
  };
  isUpdating = false;
  isRedirecting = false;
  isVerifying = false;
  searchJob = '';
  selectedFilter: 'all' | 'numberOfApplications' | 'mostRecent' | 'jobViews' =
    'all';
  selectedCardIndex: number | null = null;
  filters: Filter[] = [
    { name: 'All', symbol: 'all' },
    { name: 'Job views', symbol: 'jobViews' },
    { name: 'Most recent', symbol: 'mostRecent' },
    { name: 'Number of applications', symbol: 'numberOfApplications' },
  ];
  page = 1;
  take = 8;
  count = 0;
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

  constructor(
    private readonly fb: FormBuilder,
    private readonly toastService: ToastService,
    private readonly jobService: JobService,
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getJobs();
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

  onCardClick(index: number) {
    if (this.selectedCardIndex === index) {
      this.selectedCardIndex = null;
    } else {
      this.selectedCardIndex = index;
    }
  }

  filterJobsDto() {
    const filter: FilterCompanyJobs = {};
    if (this.selectedFilter !== 'all') filter[this.selectedFilter] = true;
    if (this.searchJob) filter.search = this.searchJob;
    return filter;
  }

  redirectToJobInterviewSettingsPage(id: string) {
    this.router.navigate(['/pages/interview-questions'], {
      queryParams: { jobId: id },
    });
  }

  getJobs() {
    const pagination: Pagination = {
      take: this.take,
      skip: (this.page - 1) * this.take,
    };
    const filter = this.filterJobsDto();
    this.isLoading = true;
    this.jobService.findManyJobsCompanyView(filter, pagination).subscribe({
      next: ({ jobs, count }) => {
        this.jobs = jobs;
        this.count = count;
        this.isLoading = false;
      },
      error: ({ error }) => {
        this.isLoading = false;
        const message =
          error.statusCode !== 500
            ? error.message
            : 'Error while retrieving jobs';
        this.toastService.showToast({
          message,
          type: 'error',
        });
      },
    });
  }

  completeProfile() {
    this.router.navigate(['/pages/create-company-profile']);
  }

  verifyUser() {
    this.isVerifying = true;
    this.userService.self().subscribe({
      next: (user) => {
        this.isVerifying = false;

        if (!user?.companyProfile) {
          this.incompleteProfile = true;
          setTimeout(() => {
            // Trick to delay the operation until after the current call stack has cleared. This will give Angular time to update the DOM.
            window.modal['showModal']();
          }, 0);
        } else window.create_job['showModal']();
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

  createJob() {
    const reference =
      this.form.value.jobStatus === 'PUBLISHED' ? 'isPublishing' : 'isCreating';
    this.creatingStatus[reference] = true;
    const createJob: CreateJob = {
      ...(this.form.value as CreateJob),
    };
    this.jobService.create(createJob).subscribe({
      next: () => {
        this.toastService.showToast({
          message: 'Success! Job successfully created.',
          type: 'success',
        });
        this.creatingStatus[reference] = false;
        this.getJobs();
        window.create_job['close']();
        this.resetForm();
      },
      error: ({ error }) => {
        if (
          error.message ===
          'You can not create a job before completing your profile.'
        ) {
          this.incompleteProfile = true;
          setTimeout(() => {
            // Trick to delay the operation until after the current call stack has cleared. This will give Angular time to update the DOM.
            window.modal['showModal']();
          }, 0);
        }
        this.toastService.showToast({
          message: 'Error while creating Job!',
          type: 'error',
        });
        this.creatingStatus[reference] = false;
      },
    });
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
        this.getJobs();
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
}
