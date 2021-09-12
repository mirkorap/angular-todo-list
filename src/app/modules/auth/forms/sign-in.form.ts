import { FormGroup } from '@angular/forms';
import { ICredentialsDto } from '@auth/data-transfer-objects/credentials';
import { Subject } from 'rxjs';

export class SignInForm {
  private signInClickSource = new Subject<ICredentialsDto>();
  signInClick$ = this.signInClickSource.asObservable();

  private registerClickSource = new Subject<ICredentialsDto>();
  registerClick$ = this.registerClickSource.asObservable();

  private signInWithGoogleClickSource = new Subject<void>();
  signInWithGoogleClick$ = this.signInWithGoogleClickSource.asObservable();

  constructor(private formGroup: FormGroup) {}

  get asFormGroup(): FormGroup {
    return this.formGroup;
  }

  get value(): ICredentialsDto {
    return this.formGroup.value;
  }

  signIn(): void {
    if (this.formGroup.invalid) {
      return this.formGroup.markAllAsTouched();
    }

    this.signInClickSource.next(this.value);
  }

  register(): void {
    if (this.formGroup.invalid) {
      return this.formGroup.markAllAsTouched();
    }

    this.registerClickSource.next(this.value);
  }

  signInWithGoogle(): void {
    this.signInWithGoogleClickSource.next();
  }
}
