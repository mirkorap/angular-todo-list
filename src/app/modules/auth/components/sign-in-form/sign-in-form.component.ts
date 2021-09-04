import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SignInForm } from '@auth/forms/sign-in.form';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInFormComponent {
  @Input() isSubmitting = false;

  constructor(public signInForm: SignInForm) {}
}
