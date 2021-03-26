import { AuthFailure } from '@auth/failures/auth-failure';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@auth/entities/user';

@Injectable()
export abstract class AuthStoreFacadeService {
  abstract user$: Observable<User | Record<string, never>>;
  abstract failureMessage$: Observable<string | null>;
  abstract isSubmitting$: Observable<boolean>;
  abstract isSignedIn$: Observable<boolean>;

  abstract registerWithEmailAndPassword(
    emailAddress: string,
    password: string
  ): void;

  abstract signInWithEmailAndPassword(
    emailAddress: string,
    password: string
  ): void;

  abstract signInWithGoogle(): void;

  abstract signOut(): void;

  abstract authorize(user: User): void;

  abstract unauthorize(failure: AuthFailure): void;
}
