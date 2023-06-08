import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsDetailsComponent } from './jobs-details.component';
import { AccountTypePersonGuard } from '../../../guards/account-type-person.guard';

const routes: Routes = [
  {
    path: '',
    component: JobsDetailsComponent,
    canActivate: [AccountTypePersonGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsDetailsRoutingModule {}
