import { Component } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApplicationsJobCardComponent } from '../../../shared/components/applications-job-card/applications-job-card.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { InputSearchComponent } from '../../../shared/components/input-search/input-search.component';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';
import { JobApplicationStatusEnum } from '@wagademy/types';

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
  applicationStatus: JobApplicationStatusEnum;
}

@Component({
  selector: 'wagademy-applications-job',
  standalone: true,
  imports: [
    InputComponent,
    NgIf,
    NgFor,
    RouterModule,
    FormsModule,
    NgClass,
    ApplicationsJobCardComponent,
    PaginationComponent,
    InputSearchComponent,
    BackButtonComponent,
  ],
  templateUrl: './applications-job.component.html',
  styleUrl: './applications-job.component.scss',
})
export class ApplicationsJobComponent {
  jobs: Job[] = [
    {
      image: './assets/img/images/img-card-content-example.png',
      title: 'Darrell',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
      jobType: 'Full time',
      allocation: 'Remote work',
      responsibilities:
        'Responsible for creating, maintaining and updating software systems, according to the needs and requirements of customers and the company.',
      company: 'Dole Inc.',
      info: 'Dole Inc. is a technology company that offers innovative solutions in software development, IT consulting services and cloud solutions for companies in different sectors.',
      applicationStatus: 'INTERVIEWED',
    },
    {
      image: './assets/img/images/img-card-content-example.png',
      title: 'Bessie',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
      jobType: 'Full time',
      allocation: 'Remote work',
      responsibilities:
        'Responsible for creating, maintaining and updating software systems, according to the needs and requirements of customers and the company.',
      company: 'Dole Inc.',
      info: 'Dole Inc. is a technology company that offers innovative solutions in software development, IT consulting services and cloud solutions for companies in different sectors.',
      applicationStatus: 'INTERVIEWED',
    },
    {
      image: './assets/img/images/img-card-content-example.png',
      title: 'Marvin',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
      jobType: 'Full time',
      allocation: 'Remote work',
      responsibilities:
        'Responsible for creating, maintaining and updating software systems, according to the needs and requirements of customers and the company.',
      company: 'Dole Inc.',
      info: 'Dole Inc. is a technology company that offers innovative solutions in software development, IT consulting services and cloud solutions for companies in different sectors.',
      applicationStatus: 'INTERVIEWED',
    },
    {
      image: './assets/img/images/img-card-content-example.png',
      title: 'Claire',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
      jobType: 'Full time',
      allocation: 'Remote work',
      responsibilities:
        'Responsible for creating, maintaining and updating software systems, according to the needs and requirements of customers and the company.',
      company: 'Dole Inc.',
      info: 'Dole Inc. is a technology company that offers innovative solutions in software development, IT consulting services and cloud solutions for companies in different sectors.',
      applicationStatus: 'INVITED',
    },
  ];
  filters: Filter[] = [
    { name: 'All' },
    { name: 'Most recent' },
    { name: 'Invited' },
    { name: 'Interviewed' },
  ];
  page = 1;
  take = 1;
  count = 5;
  searchJob = '';
  selectedFilter = 'All';

  sendInvite() {
    //
  }

  get filteredJobs() {
    if (this.searchJob) {
      return this.jobs.filter((job: Job) =>
        job.title.toLowerCase().includes(this.searchJob.toLowerCase())
      );
    } else {
      return this.jobs;
    }
  }
}
