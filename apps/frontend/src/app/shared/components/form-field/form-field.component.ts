import { NgClass, NgIf, NgSwitchCase, NgSwitch, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { PasswordComplexityErrors } from '../../utils/password-complexity-validator';

@Component({
  selector: 'wagademy-form-field',
  standalone: true,
  imports: [NgClass, NgSwitchCase, NgIf, NgSwitch, NgFor],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
})
export class FormFieldComponent {
  @Input() label = '';
  @Input() control?: AbstractControl;
  @Input() patternError: string | undefined;
  @Input() isInputMandatory: boolean = false;

  hasError() {
    return !!(this.control?.invalid && this.control.touched);
  }

  getError(errorKey: string) {
    return this.control?.getError(errorKey);
  }

  get errorKey() {
    return this.control?.errors && Object.keys(this.control.errors)[0];
  }

  isErrorOfTypePasswordComplexity(
    error: unknown
  ): error is PasswordComplexityErrors {
    return (
      Array.isArray(error) &&
      Object.prototype.hasOwnProperty.call(error[0], 'message') &&
      Object.prototype.hasOwnProperty.call(error[0], 'isValid')
    );
  }
}
