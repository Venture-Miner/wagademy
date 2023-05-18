import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonPrimaryModule } from '../../../shared/button-primary/button-primary.module';
import { ButtonSecondaryModule } from '../../../shared/button-secondary/button-secondary.module';
import { NavbarAuthenticatedModule } from '../../../shared/navbar-authenticated/navbar-authenticated.module';
import { SuccessModalModule } from '../../../shared/success-modal/success-modal.module';
import { WarningModalModule } from '../../../shared/warning-modal/warning-modal.module';
import { RecommendationsPageRoutingModule } from './recommendations-page-routing.module';
import { RecommendationsPageComponent } from './recommendations-page.component';

@NgModule({
  declarations: [RecommendationsPageComponent],
  imports: [
    CommonModule,
    RecommendationsPageRoutingModule,
    ButtonSecondaryModule,
    NavbarAuthenticatedModule,
    ButtonPrimaryModule,
    WarningModalModule,
    SuccessModalModule,
  ],
})
export class RecommendationsPageModule {}
