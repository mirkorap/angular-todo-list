import * as validators from '@shared/validators/form-validators';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICredentialsDto } from '@auth/data-transfer-objects/credentials';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInFormComponent implements OnInit {
  @Output() signIn = new EventEmitter<ICredentialsDto>();
  @Output() register = new EventEmitter<ICredentialsDto>();
  @Output() signInWithGoogle = new EventEmitter();

  authForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  onSignInClick(): void {
    if (this.authForm.invalid) {
      return this.authForm.markAllAsTouched();
    }

    const credentials: ICredentialsDto = { ...this.authForm.value };
    this.signIn.emit(credentials);
  }

  onRegisterClick(): void {
    if (this.authForm.invalid) {
      return this.authForm.markAllAsTouched();
    }

    const credentials: ICredentialsDto = { ...this.authForm.value };
    this.register.emit(credentials);
  }

  onSignInWithGoogleClick(): void {
    this.signInWithGoogle.emit();
  }

  private buildForm(): void {
    this.authForm = this.fb.group({
      emailAddress: ['', validators.emailAddressValidator()],
      password: ['', validators.passwordValidator()]
    });
  }
}
