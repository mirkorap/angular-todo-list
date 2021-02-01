import { AuthFailure } from '../failures/auth-failure';
import { EmailAddress } from '../value-objects/email-address';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Password } from '../value-objects/password';
import { User } from '../entities/user';

@Injectable()
export abstract class AuthService {
  abstract registerWithEmailAndPassword(
    emailAddress: EmailAddress,
    password: Password
  ): Promise<AuthFailure | void>;

  abstract signInWithEmailAndPassword(
    emailAddress: EmailAddress,
    password: Password
  ): Promise<AuthFailure | void>;

  abstract signInWithGoogle(): Promise<AuthFailure | void>;

  abstract signOut(): Promise<void>;

  abstract getSignedInUser(): Observable<AuthFailure | User>;
}
