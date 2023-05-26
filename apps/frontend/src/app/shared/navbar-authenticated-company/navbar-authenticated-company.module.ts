import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownLanguageComponent } from './dropdown-language/dropdown-language.component';
import { NavbarAuthenticatedCompanyComponent } from './navbar-authenticated-company.component';
import { DropdownProfileCompanyComponent } from './dropdown-profile-company/dropdown-profile-company.component';

@NgModule({
  declarations: [
    NavbarAuthenticatedCompanyComponent,
    DropdownLanguageComponent,
    DropdownProfileCompanyComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [NavbarAuthenticatedCompanyComponent],
})
export class NavbarAuthenticatedCompanyModule {}
