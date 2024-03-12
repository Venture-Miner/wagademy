import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CardsComponent } from '../../shared/components/cards/cards.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { Router } from '@angular/router';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

interface Filter {
  name: string;
}

interface Job {
  images: string;
  name: string;
  description: string;
  time: string;
  locale: string;
  responsibilities: string;
  company: string;
  infos: string;
}

@Component({
  selector: 'wagademy-jobs',
  standalone: true,
  imports: [InputComponent, NgIf, NgFor, CardsComponent, PaginationComponent],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss',
})
export class JobsComponent {
  jobs: Job[] = [
    {
      images: './assets/img/images/img-card-content.png',
      name: 'Product Designer',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
      time: 'Full time',
      locale: 'Remote work',
      responsibilities:
        'Responsible for creating, maintaining and updating software systems, according to the needs and requirements of customers and the company.',
      company: 'Dole Inc.',
      infos:
        'Dole Inc. is a technology company that offers innovative solutions in software development, IT consulting services and cloud solutions for companies in different sectors.',
    },
    {
      images: './assets/img/images/img-card-content.png',
      name: 'Product Designer',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
      time: 'Full time',
      locale: 'Remote work',
      responsibilities:
        'Responsible for creating, maintaining and updating software systems, according to the needs and requirements of customers and the company.',
      company: 'Dole Inc.',
      infos:
        'Dole Inc. is a technology company that offers innovative solutions in software development, IT consulting services and cloud solutions for companies in different sectors.',
    },
    {
      images: './assets/img/images/img-card-content.png',
      name: 'Product Designer',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
      time: 'Full time',
      locale: 'Remote work',
      responsibilities:
        'Responsible for creating, maintaining and updating software systems, according to the needs and requirements of customers and the company.',
      company: 'Dole Inc.',
      infos:
        'Dole Inc. is a technology company that offers innovative solutions in software development, IT consulting services and cloud solutions for companies in different sectors.',
    },
    {
      images: './assets/img/images/img-card-content.png',
      name: 'Product Designer',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
      time: 'Full time',
      locale: 'Remote work',
      responsibilities:
        'Responsible for creating, maintaining and updating software systems, according to the needs and requirements of customers and the company.',
      company: 'Dole Inc.',
      infos:
        'Dole Inc. is a technology company that offers innovative solutions in software development, IT consulting services and cloud solutions for companies in different sectors.',
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

  constructor(public router: Router) {}

  jobDetails(job: Job) {
    this.router.navigate(['/pages/jobs-details'], {
      queryParams: job,
    });
  }

  getJobs() {
    /* TODO document why this method 'getJobs' is empty */
  }
}
