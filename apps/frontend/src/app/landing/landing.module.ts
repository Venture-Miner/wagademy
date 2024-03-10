import { NgModule } from '@angular/core';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { NavbarModule } from './layout/navbar/navbar.module';
import { FooterModule } from './layout/footer/footer.module';

@NgModule({
  declarations: [LandingComponent],
  imports: [LandingRoutingModule, NavbarModule, FooterModule],
})
export class LandingModule {}
