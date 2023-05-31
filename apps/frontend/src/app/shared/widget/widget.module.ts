import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './widget.component';
import { InputModule } from '../input/input.module';

@NgModule({
  declarations: [WidgetComponent],
  imports: [CommonModule, InputModule],
  exports: [WidgetComponent],
})
export class WidgetModule {}
