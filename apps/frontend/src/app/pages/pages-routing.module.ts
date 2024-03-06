import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCertificatesComponent } from './certificates/my-certificates.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'certificates',
        component: MyCertificatesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
