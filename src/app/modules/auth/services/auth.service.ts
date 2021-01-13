import { Observable } from 'rxjs';
import { Password } from './../value-objects/password';
import { EmailAddress } from './../value-objects/email-address';
import { Injectable } from '@angular/core';
import { User } from '../entities/user';

@Injectable()
export abstract class AuthService {
  abstract registerWithEmailAndPassword(
    emailAddress: EmailAddress,
    password: Password
  ): Promise<void>;

  abstract signInWithEmailAndPassword(
    emailAddress: EmailAddress,
    password: Password
  ): Promise<void>;

  abstract signInWithGoogle(): Promise<void>;

  abstract signOut(): Promise<void>;

  abstract getSignedInUser(): Observable<User>;
}
