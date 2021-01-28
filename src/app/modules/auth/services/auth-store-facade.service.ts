import { AuthFailure } from './../failures/auth-failure';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entities/user';

@Injectable()
export abstract class AuthStoreFacadeService {
  abstract user$: Observable<User | Record<string, never>>;
  abstract failure$: Observable<AuthFailure | null>;
  abstract isSubmitting$: Observable<boolean>;
  abstract isSignedIn$: Observable<boolean>;
  abstract showErrorMessage$: Observable<boolean>;

  abstract registerWithEmailAndPassword(
    emailAddress: string,
    password: string
  ): void;

  abstract signInWithEmailAndPassword(
    emailAddress: string,
    password: string
  ): void;

  abstract signInWithGoogle(): void;
}
