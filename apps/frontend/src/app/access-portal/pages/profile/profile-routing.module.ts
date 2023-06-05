import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AccountTypePersonGuard } from '../../../guards/account-type-person.guard';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [AccountTypePersonGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
