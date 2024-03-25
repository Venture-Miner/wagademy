import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './person/home/home.component';
import { MyCertificatesComponent } from './certificates/my-certificates.component';
import { JobApplicationsAllComponent } from './person/job-applications-all/job-applications-all.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobsDetailsComponent } from './jobs-details/jobs-details.component';
import { GptListComponent } from './person/gpt-list/gpt-list.component';
import { GptChatComponent } from './person/gpt-chat/gpt-chat.component';

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
        path: 'certificates',
        component: MyCertificatesComponent,
      },
      {
        path: 'gptchat',
        component: GptChatComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'job-applications-all',
        component: JobApplicationsAllComponent,
      },
      {
        path: 'jobs',
        component: JobsComponent,
      },
      {
        path: 'jobs-details',
        component: JobsDetailsComponent,
      },
      {
        path: 'chatbot',
        component: GptListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
