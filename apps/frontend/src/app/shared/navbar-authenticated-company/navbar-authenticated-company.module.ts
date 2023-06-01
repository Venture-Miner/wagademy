import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarAuthenticatedCompanyComponent } from './navbar-authenticated-company.component';
import { DropdownProfileCompanyComponent } from './dropdown-profile-company/dropdown-profile-company.component';
import { DropdownLanguageModule } from '../dropdown-language/dropdown-language.module';

@NgModule({
  declarations: [
    NavbarAuthenticatedCompanyComponent,
    DropdownProfileCompanyComponent,
  ],
  imports: [CommonModule, RouterModule, DropdownLanguageModule],
  exports: [NavbarAuthenticatedCompanyComponent],
})
export class NavbarAuthenticatedCompanyModule {}
