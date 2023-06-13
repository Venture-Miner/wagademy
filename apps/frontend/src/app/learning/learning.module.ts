import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearningComponent } from './learning.component';
import { LearningRoutingModule } from './learning-routing.module';
import { ButtonSecondaryModule } from '../shared/button-secondary/button-secondary.module';
import { NavbarLandingModule } from '../landing/navbar-landing/navbar-landing.module';

@NgModule({
  declarations: [LearningComponent],
  imports: [
    CommonModule,
    LearningRoutingModule,
    ButtonSecondaryModule,
    NavbarLandingModule,
  ],
})
export class LearningModule {}
