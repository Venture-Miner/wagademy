import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendRequestsComponent } from './friend-requests.component';
import { AccountTypePersonGuard } from '../../../guards/account-type-person.guard';

const routes: Routes = [
  {
    path: '',
    component: FriendRequestsComponent,
    canActivate: [AccountTypePersonGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendRequestRoutingModule {}
