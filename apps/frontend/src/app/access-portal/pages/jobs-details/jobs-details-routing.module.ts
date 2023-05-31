import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsDetailsComponent } from './jobs-details.component';

const routes: Routes = [
  {
    path: '',
    component: JobsDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsDetailsRoutingModule {}
