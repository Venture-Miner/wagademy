import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { NavbarLandingComponent } from '../shared/components/layout/navbar-landing/navbar-landing.component';
import { FooterComponent } from '../shared/components/layout/footer/footer.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [LandingComponent, NavbarLandingComponent, FooterComponent],
  imports: [CommonModule, RouterModule, LandingRoutingModule],
  providers: [],
})
export class LandingModule {}
