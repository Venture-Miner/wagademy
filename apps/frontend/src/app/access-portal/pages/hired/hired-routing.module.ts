import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HiredComponent } from './hired.component';
import { AccountTypeCompanyGuard } from '../../../guards/account-type-company.guard';

const routes: Routes = [
  {
    path: '',
    component: HiredComponent,
    canActivate: [AccountTypeCompanyGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HiredRoutingModule {}
