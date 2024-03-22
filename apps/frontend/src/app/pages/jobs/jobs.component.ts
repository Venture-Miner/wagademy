import { Component } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { CardsComponent } from '../../shared/components/cards/cards.component';
import { Router } from '@angular/router';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { FormsModule } from '@angular/forms';

interface Filter {
  name: string;
}

interface Job {
  image: string;
  title: string;
  description: string;
  jobType: string;
  allocation: string;
  responsibilities: string;
  company: string;
  info: string;
}

@Component({
  selector: 'wagademy-jobs',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    CardsComponent,
    PaginationComponent,
    FormsModule,
    NgClass,
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss',
})
export class JobsComponent {
  jobs: Job[] = [
    {
      image: './assets/img/images/img-card-content.png',
      title: 'Product Designer',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
      jobType: 'Full time',
      allocation: 'Remote work',
      responsibilities:
        'Responsible for creating, maintaining and updating software systems, according to the needs and requirements of customers and the company.',
      company: 'Dole Inc.',
      info: 'Dole Inc. is a technology company that offers innovative solutions in software development, IT consulting services and cloud solutions for companies in different sectors.',
    },
    {
      image: './assets/img/images/img-card-content.png',
      title: 'Product Designer',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
      jobType: 'Full time',
      allocation: 'Remote work',
      responsibilities:
        'Responsible for creating, maintaining and updating software systems, according to the needs and requirements of customers and the company.',
      company: 'Dole Inc.',
      info: 'Dole Inc. is a technology company that offers innovative solutions in software development, IT consulting services and cloud solutions for companies in different sectors.',
    },
    {
      image: './assets/img/images/img-card-content.png',
      title: 'Product Designer',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
      jobType: 'Full time',
      allocation: 'Remote work',
      responsibilities:
        'Responsible for creating, maintaining and updating software systems, according to the needs and requirements of customers and the company.',
      company: 'Dole Inc.',
      info: 'Dole Inc. is a technology company that offers innovative solutions in software development, IT consulting services and cloud solutions for companies in different sectors.',
    },
    {
      image: './assets/img/images/img-card-content.png',
      title: 'Product Designer',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
      jobType: 'Full time',
      allocation: 'Remote work',
      responsibilities:
        'Responsible for creating, maintaining and updating software systems, according to the needs and requirements of customers and the company.',
      company: 'Dole Inc.',
      info: 'Dole Inc. is a technology company that offers innovative solutions in software development, IT consulting services and cloud solutions for companies in different sectors.',
    },
  ];
  isLoading = false;
  filters: Filter[] = [
    { name: 'All' },
    { name: 'Featured' },
    { name: 'Most recent' },
  ];
  page = 1;
  take = 1;
  count = 5;
  searchJob = '';
  selectedFilter = 'All';

  constructor(private router: Router) {}

  jobDetails(job: Job) {
    this.router.navigate(['/pages/jobs-details'], {
      queryParams: job,
    });
  }

  getJobs() {
    /* TODO document why this method 'getJobs' is empty */
  }

  get filteredJobs() {
    if (this.searchJob) {
      return this.jobs.filter((course: Job) =>
        course.title.toLowerCase().includes(this.searchJob.toLowerCase())
      );
    } else {
      return this.jobs;
    }
  }
}
