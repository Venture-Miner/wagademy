import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarAuthenticatedComponent } from './navbar-authenticated.component';
import { RouterModule } from '@angular/router';
import { DropdownLanguageComponent } from './dropdown-language/dropdown-language.component';
import { DropdownProfileComponent } from './dropdown-profile/dropdown-profile.component';

@NgModule({
  declarations: [
    NavbarAuthenticatedComponent,
    DropdownLanguageComponent,
    DropdownProfileComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [NavbarAuthenticatedComponent],
})
export class NavbarAuthenticatedModule {}
