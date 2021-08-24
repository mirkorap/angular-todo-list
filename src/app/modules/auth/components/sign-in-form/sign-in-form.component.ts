import * as validators from '@shared/validators/form-validators';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
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
  @Input() isSubmitting = false;

  @Output() signIn = new EventEmitter<ICredentialsDto>();
  @Output() register = new EventEmitter<ICredentialsDto>();
  @Output() signInWithGoogle = new EventEmitter<void>();

  authForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  emitSignInEvent(): void {
    if (this.authForm.invalid) {
      return this.authForm.markAllAsTouched();
    }

    this.signIn.emit(this.authForm.value);
  }

  emitRegisterEvent(): void {
    if (this.authForm.invalid) {
      return this.authForm.markAllAsTouched();
    }

    this.register.emit(this.authForm.value);
  }

  emitSignInWithGoogleEvent(): void {
    this.signInWithGoogle.emit();
  }

  private buildForm(): void {
    this.authForm = this.fb.group({
      emailAddress: ['', validators.emailAddressValidator()],
      password: ['', validators.passwordValidator()]
    });
  }
}
