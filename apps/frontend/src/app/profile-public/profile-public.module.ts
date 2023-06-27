import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './post-card';
import { ProfilePublicComponent } from './profile-public.component';
import { NavbarLandingModule } from '../landing/navbar-landing/navbar-landing.module';
import { RouterModule } from '@angular/router';
import { ProfilePublicRoutingModule } from './profile-public-routing.module';
import { NavbarAuthenticatedModule } from '../shared/navbar-authenticated/navbar-authenticated.module';

@NgModule({
  declarations: [ProfilePublicComponent, PostCardComponent],
  imports: [
    CommonModule,
    NavbarLandingModule,
    RouterModule,
    ProfilePublicRoutingModule,
    NavbarAuthenticatedModule,
  ],
})
export class ProfilePublicModule {}
