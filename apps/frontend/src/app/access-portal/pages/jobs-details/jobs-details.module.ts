import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsDetailsComponent } from './jobs-details.component';
import { JobsDetailsRoutingModule } from './jobs-details-routing.module';
import { JobCardDetailsComponent } from './components/job-card-details';
import { ButtonPrimaryModule } from '../../../shared/button-primary/button-primary.module';
import { ButtonSecondaryModule } from '../../../shared/button-secondary/button-secondary.module';
import { NavbarAuthenticatedModule } from '../../../shared/navbar-authenticated/navbar-authenticated.module';

@NgModule({
  declarations: [JobsDetailsComponent, JobCardDetailsComponent],
  imports: [
    CommonModule,
    JobsDetailsRoutingModule,
    ButtonPrimaryModule,
    ButtonSecondaryModule,
    NavbarAuthenticatedModule,
  ],
})
export class JobsDetailsModule {}
