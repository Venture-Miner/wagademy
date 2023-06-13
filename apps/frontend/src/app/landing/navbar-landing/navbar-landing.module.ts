import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarLandingComponent } from './navbar-landing.component';
import { ButtonSecondaryModule } from '../../shared/button-secondary/button-secondary.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarLandingComponent],
  imports: [CommonModule, ButtonSecondaryModule, RouterModule],
  exports: [NavbarLandingComponent],
})
export class NavbarLandingModule {}
