import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProfileComponent } from './create-profile.component';
import { AccountTypePersonGuard } from '../../../guards/account-type-person.guard';

const routes: Routes = [
  {
    path: '',
    component: CreateProfileComponent,
    canActivate: [AccountTypePersonGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateProfileRoutingModule {}
