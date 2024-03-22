import { NgModule } from '@angular/core';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CompanyComponent],
  imports: [CompanyRoutingModule, RouterModule],
  providers: [],
})
export class CompanyModule {}
