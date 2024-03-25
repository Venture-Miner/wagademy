import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { NgClass, NgIf } from '@angular/common';
import { ApplicationsCardsComponent } from '../../../shared/components/applications-cards/applications-cards.component';

@Component({
  selector: 'wagademy-job-applications-all',
  standalone: true,
  imports: [
    RouterModule,
    ModalComponent,
    PaginationComponent,
    NgClass,
    ApplicationsCardsComponent,
    NgIf,
  ],
  templateUrl: './job-applications-all.component.html',
  styleUrl: './job-applications-all.component.scss',
})
export class JobApplicationsAllComponent {
  applicationsType: 'All' | 'interviewInvites' = 'All';
  page = 1;
  take = 1;
  count = 5;
  applications = [
    {
      id: '',
      name: 'Job title',
      company: 'Company',
      interviewInvites: true,
    },
    {
      id: '',
      name: 'Job title',
      company: 'Company',
      interviewInvites: true,
    },
    {
      id: '',
      name: 'Job title',
      company: 'Company',
    },
    {
      id: '',
      name: 'Job title',
      company: 'Company',
    },
    {
      id: '',
      name: 'Job title',
      company: 'Company',
    },
    {
      id: '',
      name: 'Job title',
      company: 'Company',
    },
  ];

  getApplications() {
    //TODO
  }

  getInterviewInvitesCount(): number {
    return this.applications.filter((app) => app.interviewInvites).length;
  }

  openModal() {
    window.modal['showModal']();
  }
}
