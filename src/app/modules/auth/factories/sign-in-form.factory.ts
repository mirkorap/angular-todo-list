import * as validators from '@shared/validators/form-validators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { SignInForm } from '@auth/forms/sign-in.form';

@Injectable()
export class SignInFormFactory {
  constructor(private fb: FormBuilder) {}

  create(): SignInForm {
    const formGroup = this.createFormGroup();
    return new SignInForm(formGroup);
  }

  private createFormGroup(): FormGroup {
    return this.fb.group({
      emailAddress: ['', validators.emailAddressValidator()],
      password: ['', validators.passwordValidator()]
    });
  }
}
