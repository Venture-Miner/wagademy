import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export type PasswordComplexityErrors = {
  message: string;
  isValid: boolean;
}[];

export const passwordComplexityValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const value = control.value;
  if (!value) {
    return null;
  }

  const hasUpperAndLowerCases = /[a-z]+/.test(value) && /[A-Z]+/.test(value);
  const hasNumbersAndLetters = /[a-zA-Z]+/.test(value) && /[0-9]+/.test(value);
  const hasSpecialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(
    value
  );
  const hasMinimumLength = value.length >= 8;

  const passwordValid =
    hasUpperAndLowerCases &&
    hasNumbersAndLetters &&
    hasSpecialCharacters &&
    hasMinimumLength;

  const errors: PasswordComplexityErrors = [
    { message: 'At least 8 characters', isValid: hasMinimumLength },
    { message: 'Numbers and letters', isValid: hasNumbersAndLetters },
    {
      message: 'Upper and lower case letters',
      isValid: hasUpperAndLowerCases,
    },
    { message: 'One special character', isValid: hasSpecialCharacters },
  ];

  return !passwordValid ? { customvalidator: errors } : null;
};
