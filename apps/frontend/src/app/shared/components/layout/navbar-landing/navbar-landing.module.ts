import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarLandingComponent } from './navbar-landing.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarLandingComponent],
  imports: [CommonModule, RouterModule],
  providers: [],
})
export class NavbarLandingModule {}
