import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeCompanyComponent } from './company/home/home.component';
import { HomeComponent } from './person/home/home.component';
import { MyCertificatesComponent } from './certificates/my-certificates.component';
import { GptChatComponent } from './gpt-chat/gpt-chat.component';

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
        path: 'home-company',
        component: HomeCompanyComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
