import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCompanyProfileComponent } from './create-company-profile.component';
import { AccountTypeCompanyGuard } from '../../../guards/account-type-company.guard';

const routes: Routes = [
  {
    path: '',
    component: CreateCompanyProfileComponent,
    canActivate: [AccountTypeCompanyGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCompanyProfileRoutingModule {}
