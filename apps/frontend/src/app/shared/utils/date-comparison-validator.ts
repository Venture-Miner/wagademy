import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const dateValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;

    if (startDate && endDate && startDate > endDate) {
      control.get('endDate')?.setErrors({ startDateGreaterThanEndDate: true });
      return { startDateGreaterThanEndDate: true };
    }

    if (startDate && endDate && startDate === endDate) {
      control.get('endDate')?.setErrors({ datesAreEqual: true });
      return { datesAreEqual: true };
    }

    return null;
  };
};
