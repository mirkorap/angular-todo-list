import { AuthFailure } from '@auth/failures/auth-failure';
import { EmailAddress } from '@auth/value-objects/email-address';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Password } from '@auth/value-objects/password';
import { User } from '@auth/entities/user';

@Injectable()
export abstract class AuthService {
  abstract registerWithEmailAndPassword(
    emailAddress: EmailAddress,
    password: Password
  ): Promise<AuthFailure | User>;

  abstract signInWithEmailAndPassword(
    emailAddress: EmailAddress,
    password: Password
  ): Promise<AuthFailure | User>;

  abstract signInWithGoogle(): Promise<AuthFailure | User>;

  abstract signOut(): Promise<void>;

  abstract getCurrentUser(): Observable<AuthFailure | User>;
}
