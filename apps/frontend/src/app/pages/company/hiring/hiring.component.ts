import { Component } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
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
import { ToastComponent } from '../../../shared/components/toast/toast.component';

interface Job {
  applications: number;
  name: string;
  description: string;
  view: number;
}

interface Filter {
  name: string;
}

@Component({
  selector: 'wagademy-hiring',
  standalone: true,
  imports: [
    InputComponent,
    NgIf,
    NgFor,
    CardJobComponent,
    NgClass,
    FormsModule,
    PaginationComponent,
    InputComponent,
    FormFieldComponent,
    ReactiveFormsModule,
    SelectComponent,
    ModalComponent,
    ToastComponent,
  ],
  templateUrl: './hiring.component.html',
  styleUrl: './hiring.component.scss',
})
export class HiringComponent {
  jobs: Job[] = [
    {
      applications: 0,
      name: 'Job name',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
      view: 0,
    },
    {
      applications: 0,
      name: 'Job name',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
      view: 0,
    },
    {
      applications: 0,
      name: 'Job name',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
      view: 0,
    },
    {
      applications: 0,
      name: 'Job name',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
      view: 0,
    },
  ];
  isLoading = false;
  searchJob = '';
  selectedFilter = 'All';
  selectedCardIndex: number | null = null;
  filters: Filter[] = [
    { name: 'All' },
    { name: 'Job views' },
    { name: 'Most recent' },
    { name: 'Number of applications' },
  ];
  page = 1;
  take = 1;
  count = 5;
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

  constructor(
    private readonly fb: FormBuilder,
    private readonly toastService: ToastService
  ) {}

  onCardClick(index: number) {
    if (this.selectedCardIndex === index) {
      this.selectedCardIndex = null;
    } else {
      this.selectedCardIndex = index;
    }
  }

  get filteredJobs() {
    if (this.searchJob) {
      return this.jobs.filter((job: Job) =>
        job.name.toLowerCase().includes(this.searchJob.toLowerCase())
      );
    } else {
      return this.jobs;
    }
  }

  getJobs() {
    //
  }

  completeJob() {
    //
  }

  removeJob() {
    //
  }

  updateJob() {
    this.toastService.showToast({
      message: 'Success! Job successfully updated.',
      type: 'success',
    });
  }

  updateJobModal() {
    //
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
