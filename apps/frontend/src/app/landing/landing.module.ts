import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { FooterComponent } from '../shared/components/layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NavbarLandingComponent } from '../shared/components/layout/navbar-landing/navbar-landing.component';
@NgModule({
  declarations: [LandingComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    LandingRoutingModule,
    NavbarLandingComponent,
  ],
  providers: [],
})
export class LandingModule {}
