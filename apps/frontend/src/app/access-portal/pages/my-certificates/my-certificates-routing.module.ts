import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCertificatesComponent } from './my-certificates.component';

const routes: Routes = [
  {
    path: '',
    component: MyCertificatesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCertificatesRoutingModule {}
