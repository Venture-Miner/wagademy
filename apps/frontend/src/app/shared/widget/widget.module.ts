import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './widget.component';
import { BaseModalModule } from '../base-modal/base-modal.module';
import { TextAreaModule } from '../text-area/text-area.module';
import { ButtonPrimaryModule } from '../button-primary/button-primary.module';
import { NgxEmojiPickerModule } from 'ngx-emoji-picker';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [WidgetComponent],
  imports: [
    CommonModule,
    BaseModalModule,
    TextAreaModule,
    ButtonPrimaryModule,
    ReactiveFormsModule,
    NgxEmojiPickerModule.forRoot(),
  ],
  exports: [WidgetComponent],
})
export class WidgetModule {}
