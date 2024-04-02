import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { CardComponent } from '../../shared/components/card/card.component';
import { Router } from '@angular/router';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { FilterJobs, JobUserView, Pagination } from '@wagademy/types';
import { JobService } from '../../services/job/job.service';
import { ToastService } from '../../services/toast/toast.service';

interface Filter {
  name: string;
  symbol: 'all' | 'featured' | 'mostRecent';
}

@Component({
  selector: 'wagademy-jobs',
  standalone: true,
  imports: [CardComponent, PaginationComponent, FormsModule, NgClass],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss',
})
export class JobsComponent implements OnInit {
  jobs: JobUserView[] = [];
  isLoading = false;
  filters: Filter[] = [
    { name: 'All', symbol: 'all' },
    { name: 'Featured', symbol: 'featured' },
    { name: 'Most recent', symbol: 'mostRecent' },
  ];
  page = 1;
  take = 1;
  count = 5;
  searchJob = '';
  selectedFilter: 'all' | 'featured' | 'mostRecent' = 'all';

  constructor(
    private router: Router,
    private readonly jobService: JobService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.findManyJobs();
  }

  jobDetails(id: string) {
    this.router.navigate(['/pages/jobs-details'], {
      queryParams: { id },
    });
  }

  getFilter() {
    const filter: FilterJobs = {};
    if (this.selectedFilter !== 'all') filter[this.selectedFilter] = true;
    if (this.searchJob) filter.search = this.searchJob;
    return filter;
  }

  findManyJobs() {
    const pagination: Pagination = {
      take: this.take,
      skip: (this.page - 1) * this.take,
    };
    const filters = this.getFilter();
    this.jobService.findManyJobsUserView(filters, pagination).subscribe({
      next: ({ count, jobs }) => {
        this.jobs = jobs;
        this.count = count;
        this.toastService.showToast({
          message: 'Jobs successfully retrieved',
          type: 'success',
        });
      },
      error: () => {
        this.toastService.showToast({
          message: 'Error while retrieving jobs',
          type: 'error',
        });
      },
    });
  }
}
