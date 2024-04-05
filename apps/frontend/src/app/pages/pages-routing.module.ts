import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';
import { AccountTypeCompanyGuard } from '../guards/account-type-company.guard';
import { AccountTypeUserGuard } from '../guards/account-type-user.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        canActivate: [AuthGuard, AccountTypeUserGuard],
        path: 'certificates',
        loadComponent: () =>
          import('./certificates/my-certificates.component').then(
            (c) => c.MyCertificatesComponent
          ),
      },
      {
        canActivate: [AuthGuard, AccountTypeUserGuard],
        path: 'gptchat',
        loadComponent: () =>
          import('./person/gpt-chat/gpt-chat.component').then(
            (c) => c.GptChatComponent
          ),
      },
      {
        canActivate: [AuthGuard, AccountTypeCompanyGuard],
        path: 'home-company',
        loadComponent: () =>
          import('./company/home/home.component').then(
            (c) => c.HomeCompanyComponent
          ),
      },
      {
        canActivate: [AuthGuard, AccountTypeUserGuard],
        path: 'home',
        loadComponent: () =>
          import('./person/home/home.component').then((c) => c.HomeComponent),
      },
      {
        canActivate: [AuthGuard, AccountTypeCompanyGuard],
        path: 'profile',
        loadComponent: () =>
          import('./company/profile/profile.component').then(
            (c) => c.ProfileComponent
          ),
      },
      {
        canActivate: [AuthGuard, AccountTypeCompanyGuard],
        path: 'hiring',
        loadComponent: () =>
          import('./company/hiring/hiring.component').then(
            (c) => c.HiringComponent
          ),
      },
      {
        canActivate: [AuthGuard, AccountTypeUserGuard],
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
        canActivate: [AuthGuard, AccountTypeUserGuard],
        path: 'chatbot',
        loadComponent: () =>
          import('./person/gpt-list/gpt-list.component').then(
            (c) => c.GptListComponent
          ),
      },
      {
        canActivate: [AuthGuard, AccountTypeCompanyGuard],
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
