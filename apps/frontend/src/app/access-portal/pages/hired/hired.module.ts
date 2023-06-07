import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HiredRoutingModule } from './hired-routing.module';
import { HiredComponent } from './hired.component';
import { CardComponent } from './card';
import { InputSelectModule } from '../../../shared/input-select/input-select.module';
import { PaginationModule } from '../../../shared/pagination/pagination.module';
import { NavbarAuthenticatedCompanyModule } from '../../../shared/navbar-authenticated-company/navbar-authenticated-company.module';

@NgModule({
  declarations: [HiredComponent, CardComponent],
  imports: [
    CommonModule,
    HiredRoutingModule,
  NavbarAuthenticatedCompanyModule,
    InputSelectModule,
    PaginationModule,
  ],
})
export class HiredModule {}
