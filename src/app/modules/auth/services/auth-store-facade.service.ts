import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entities/user';

@Injectable()
export abstract class AuthStoreFacadeService {
  abstract user$: Observable<User>;
  abstract isSubmitting$: Observable<boolean>;
  abstract isLoggedIn$: Observable<boolean>;

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
