import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearningComponent } from './learning.component';
import { LearningRoutingModule } from './learning-routing.module';
import { ButtonSecondaryModule } from '../shared';

@NgModule({
  declarations: [LearningComponent],
  imports: [CommonModule, LearningRoutingModule, ButtonSecondaryModule],
})
export class LearningModule {}
