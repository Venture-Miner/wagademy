import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonPrimaryModule } from '../../../shared/button-primary/button-primary.module';
import { ButtonSecondaryModule } from '../../../shared/button-secondary/button-secondary.module';
import { NavbarAuthenticatedModule } from '../../../shared/navbar-authenticated/navbar-authenticated.module';
import { FriendRequestRoutingModule } from './friend-requests-routing.module';
import { FriendRequestsComponent } from './friend-requests.component';


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
