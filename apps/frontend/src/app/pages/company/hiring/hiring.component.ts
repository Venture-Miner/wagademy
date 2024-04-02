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
import { FilterCompanyJobs, JobCompanyView, Pagination } from '@wagademy/types';
import { JobService } from '../../../services/job/job.service';

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
  ],
  templateUrl: './hiring.component.html',
  styleUrl: './hiring.component.scss',
})
export class HiringComponent implements OnInit {
  jobs: JobCompanyView[] = [];
  isLoading = false;
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
    contract: ['', [Validators.required]],
    allocation: [', [Validators.required]'],
  });
  title = 'Job title example';
  description =
    'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet.';
  contract: SelectItem<string>[] = [];
  allocation: SelectItem<string>[] = [];
  status: 'Published' | 'Unpublished' = 'Published';
  incompleteProfile = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly toastService: ToastService,
    private readonly jobService: JobService
  ) {}

  ngOnInit(): void {
    this.getJobs();
  }

  toggleStatus(): void {
    this.status = this.status === 'Published' ? 'Unpublished' : 'Published';
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

  completeJob() {
    //
  }

  removeJob() {
    window.modal['showModal']();
  }

  updateJob() {
    this.toastService.showToast({
      message: 'Success! Job successfully updated.',
      type: 'success',
    });
  }

  updateJobModal() {
    window.update_job['showModal']();
  }

  unpublishJob() {
    this.toastService.showToast({
      message: 'Success! Job successfully unpublished.',
      type: 'success',
    });
  }

  publishJob() {
    this.toastService.showToast({
      message: 'Success! Job successfully published.',
      type: 'success',
    });
  }
}
