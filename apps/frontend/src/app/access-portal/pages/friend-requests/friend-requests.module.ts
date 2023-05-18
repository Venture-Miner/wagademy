import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonPrimaryModule,
  ButtonSecondaryModule,
  NavbarAuthenticatedModule,
} from '../../../shared';
import {
  FriendRequestsComponent,
  FriendRequestRoutingModule,
} from '../friend-requests';

@NgModule({
  declarations: [FriendRequestsComponent],
  imports: [
    CommonModule,
    FriendRequestRoutingModule,
    ButtonSecondaryModule,
    NavbarAuthenticatedModule,
    ButtonPrimaryModule,
  ],
})
export class FriendRequestsModule {}
