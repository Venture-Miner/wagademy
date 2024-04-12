import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PagesComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'certificates',
        loadComponent: () =>
          import('./certificates/my-certificates.component').then(
            (c) => c.MyCertificatesComponent
          ),
      },
      {
        path: 'gptchat',
        loadComponent: () =>
          import('./person/gpt-chat/gpt-chat.component').then(
            (c) => c.GptChatComponent
          ),
      },
      {
        path: 'home-company',
        loadComponent: () =>
          import('./company/home/home.component').then(
            (c) => c.HomeCompanyComponent
          ),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./person/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./company/profile/profile.component').then(
            (c) => c.ProfileComponent
          ),
      },
      {
        path: 'hiring',
        loadComponent: () =>
          import('./company/hiring/hiring.component').then(
            (c) => c.HiringComponent
          ),
      },
      {
        path: 'job-applications-all',
        loadComponent: () =>
          import(
            './person/job-applications-all/job-applications-all.component'
          ).then((c) => c.JobApplicationsAllComponent),
      },
      {
        path: 'jobs',
        loadComponent: () =>
          import('./jobs/jobs.component').then((c) => c.JobsComponent),
      },
      {
        path: 'jobs-details',
        loadComponent: () =>
          import('./jobs-details/jobs-details.component').then(
            (c) => c.JobsDetailsComponent
          ),
      },
      {
        path: 'chatbot',
        loadComponent: () =>
          import('./person/gpt-list/gpt-list.component').then(
            (c) => c.GptListComponent
          ),
      },
      {
        path: 'job-applications',
        loadComponent: () =>
          import('./company/applications-job/applications-job.component').then(
            (c) => c.ApplicationsJobComponent
          ),
      },
      {
        path: 'applicant-profile',
        loadComponent: () =>
          import(
            './company/applications-profile/applications-profile.component'
          ).then((c) => c.ApplicationsProfileComponent),
      },
      {
        path: 'result-of-applications',
        loadComponent: () =>
          import(
            './company/applications-results/applications-results.component'
          ).then((c) => c.ApplicationsResultsComponent),
      },
      {
        path: 'interview-gpt',
        loadComponent: () =>
          import('./company/interview-gpt/interview-gpt.component').then(
            (c) => c.InterviewGptComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
