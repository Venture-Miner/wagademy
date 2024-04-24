import { NgModule } from '@angular/core';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@NgModule({
  declarations: [CompanyComponent],
  imports: [CompanyRoutingModule, RouterModule, NgOptimizedImage],
  providers: [],
})
export class CompanyModule {}
