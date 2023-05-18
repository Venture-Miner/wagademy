import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './input.component';

@NgModule({
  declarations: [InputComponent],
  imports: [FormsModule],
  exports: [InputComponent],
})
export class InputModule {}
