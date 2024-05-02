import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator = (
  passwordFieldName: string,
  confirmPasswordFieldName: string
): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(passwordFieldName);
    const confirmPassword = control.get(confirmPasswordFieldName);
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ customvalidator: 'Passwords do not match' });
      return { customvalidator: 'Passwords do not match' };
    }
    return null;
  };
};
