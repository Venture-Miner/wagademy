import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCertificatesComponent } from './certificates/my-certificates.component';
import { PagesComponent } from './pages.component';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
