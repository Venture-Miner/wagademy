import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendRequestsComponent } from './friend-requests.component';

const routes: Routes = [
  {
    path: '',
    component: FriendRequestsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendRequestRoutingModule {}
