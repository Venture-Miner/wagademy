import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonPrimaryModule,
  ButtonSecondaryModule,
  NavbarAuthenticatedModule,
  SuccessModalModule,
  WarningModalModule,
} from '../../../shared';
import {
  RecommendationsPageComponent,
  RecommendationsPageRoutingModule,
} from '../../pages';

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
