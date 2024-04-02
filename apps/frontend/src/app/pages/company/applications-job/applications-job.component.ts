import { Component } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { ApplicationsJobCardComponent } from '../../../shared/components/applications-job-card/applications-job-card.component';

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
  selector: 'wagademy-applications-job',
  standalone: true,
  imports: [
    InputComponent,
    NgIf,
    NgFor,
    CardComponent,
    RouterModule,
    NgFor,
    ModalComponent,
    FormsModule,
    NgClass,
    ApplicationsJobCardComponent,
  ],
  templateUrl: './applications-job.component.html',
  styleUrl: './applications-job.component.scss',
})
export class ApplicationsJobComponent {
  image = '';
  name = 'Marvin Wilson';
  email = 'randall.cooper@email.com';
  phone = '+55 11 912345-6789';
  job = 'Software Developer';
  description =
    'Responsible for creating, maintaining and updating software systems, according to the needs and requirements of customers and the company.';
  modality = 'Full time';
  schedule = 'Remote work';
  locale = '';
  birthday = '';
  state = '';
  about = '';
  course = '';
  period = '';
  courseDescription = '';
  company = '';
  periodWork = '';
  jobDescription = '';
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

  sendInvite() {
    //
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
