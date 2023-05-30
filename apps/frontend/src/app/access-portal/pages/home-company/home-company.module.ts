import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCompanyRoutingModule } from './home-company-routing.module';
import { HomeCompanyComponent } from './home-company.component';
import { NavbarAuthenticatedCompanyModule } from '../../../shared/navbar-authenticated-company/navbar-authenticated-company.module';
import { InputModule } from '../../../shared/input/input.module';
import { InputSelectModule } from '../../../shared/input-select/input-select.module';
import { WidgetModule } from '../../../shared/widget/widget.module';
import { CompanyCardComponent } from './components/company-card';
import { CompaniesActivitiesComponent } from './components/companies-activities';
import { DetailsModalComponent } from './components/details-modal';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeCompanyComponent,
    CompanyCardComponent,
    CompaniesActivitiesComponent,
    DetailsModalComponent,
  ],
  imports: [
    CommonModule,
    HomeCompanyRoutingModule,
    NavbarAuthenticatedCompanyModule,
    InputModule,
    InputSelectModule,
    WidgetModule,
    ReactiveFormsModule,
  ],
})
export class HomeCompanyModule {}
