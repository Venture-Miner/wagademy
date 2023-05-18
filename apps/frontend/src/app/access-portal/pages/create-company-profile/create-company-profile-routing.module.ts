import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCompanyProfileComponent } from './create-company-profile.component';

const routes: Routes = [
  {
    path: '',
    component: CreateCompanyProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCompanyProfileRoutingModule {}
