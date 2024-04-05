import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { GptListComponent } from './person/gpt-list/gpt-list.component';
import { AuthGuard } from '../guards/auth.guard';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
