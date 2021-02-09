import * as validators from '@shared/validators/value-validators';
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emailAddressValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: unknown } | null => {
    if (validators.validateEmailAddress(control.value)) {
      return null;
    }

    return { emailAddress: { value: control.value } };
  };
}

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: unknown } | null => {
    if (validators.validatePassword(control.value)) {
      return null;
    }

    return { password: { value: control.value } };
  };
}
