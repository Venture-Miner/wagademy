import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'lens-academy-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css'],
})
export class FormFieldComponent {
  @Input() label = '';
  @Input() control!: AbstractControl;
  @Input() patternError: string | undefined;

  hasError(): boolean {
    return this.control.invalid && this.control.touched;
  }

  getError(errorKey: string) {
    return this.control.getError(errorKey);
  }

  get errorKey(): string | null {
    return this.control.errors && Object.keys(this.control.errors)[0];
  }
}
