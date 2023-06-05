import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HiredRoutingModule } from './hired-routing.module';
import { HiredComponent } from './hired.component';
import { CardComponent } from './card';
import { InputSelectModule } from '../../../shared/input-select/input-select.module';
import { NavbarAuthenticatedModule } from '../../../shared/navbar-authenticated/navbar-authenticated.module';
import { PaginationModule } from '../../../shared/pagination/pagination.module';

@NgModule({
  declarations: [HiredComponent, CardComponent],
  imports: [
    CommonModule,
    HiredRoutingModule,
    NavbarAuthenticatedModule,
    InputSelectModule,
    PaginationModule,
  ],
})
export class HiredModule {}
