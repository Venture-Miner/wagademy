import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileEditComponent } from './profile-edit.component';
import { AccountTypePersonGuard } from '../../../guards/account-type-person.guard';

const routes: Routes = [
  {
    path: '',
    component: ProfileEditComponent,
    canActivate: [AccountTypePersonGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileEditRoutingModule {}
