import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarningModalComponent } from './warning-modal.component';
import { ButtonSecondaryModule, ButtonPrimaryModule } from '../../shared';

@NgModule({
  declarations: [WarningModalComponent],
  imports: [CommonModule, ButtonSecondaryModule, ButtonPrimaryModule],
  exports: [WarningModalComponent],
})
export class WarningModalModule {}
