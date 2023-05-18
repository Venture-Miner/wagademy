import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarningModalComponent } from './warning-modal.component';
import { ButtonPrimaryModule } from '../button-primary/button-primary.module';
import { ButtonSecondaryModule } from '../button-secondary/button-secondary.module';

@NgModule({
  declarations: [WarningModalComponent],
  imports: [CommonModule, ButtonSecondaryModule, ButtonPrimaryModule],
  exports: [WarningModalComponent],
})
export class WarningModalModule {}
