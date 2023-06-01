import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SquadsComponent } from './squads.component';
import { AccountTypePersonGuard } from '../../../guards/account-type-person.guard';

const routes: Routes = [
  {
    path: '',
    component: SquadsComponent,
    canActivate: [AccountTypePersonGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SquadsRoutingModule {}
