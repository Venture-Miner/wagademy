import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModalModule } from '../shared/base-modal/base-modal.module';
import { ButtonPrimaryModule } from '../shared/button-primary/button-primary.module';
import { ButtonSecondaryModule } from '../shared/button-secondary/button-secondary.module';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { NavbarLandingModule } from './navbar-landing/navbar-landing.module';
import { PostCardComponent } from './post-card';

@NgModule({
  declarations: [LandingComponent, PostCardComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    ButtonSecondaryModule,
    ButtonPrimaryModule,
    BaseModalModule,
    NavbarLandingModule,
  ],
})
export class LandingModule {}
