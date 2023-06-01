import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarAuthenticatedComponent } from './navbar-authenticated.component';
import { RouterModule } from '@angular/router';
import { DropdownProfileComponent } from './dropdown-profile/dropdown-profile.component';
import { DropdownLanguageModule } from '../dropdown-language/dropdown-language.module';

@NgModule({
  declarations: [NavbarAuthenticatedComponent, DropdownProfileComponent],
  imports: [CommonModule, RouterModule, DropdownLanguageModule],
  exports: [NavbarAuthenticatedComponent],
})
export class NavbarAuthenticatedModule {}
