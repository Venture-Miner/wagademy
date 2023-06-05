import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeCompanyComponent } from './home-company.component';
import { AccountTypeCompanyGuard } from '../../../guards/account-type-company.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeCompanyComponent,
    canActivate: [AccountTypeCompanyGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeCompanyRoutingModule {}
