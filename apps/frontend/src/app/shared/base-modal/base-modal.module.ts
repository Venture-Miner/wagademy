import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModalComponent } from './base-modal.component';

@NgModule({
  declarations: [BaseModalComponent],
  imports: [CommonModule],
  exports: [BaseModalComponent],
})
export class BaseModalModule {}
