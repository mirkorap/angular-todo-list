import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../entities/user';

@Injectable()
export abstract class AuthStoreFacadeService {
  user$: Observable<User>;
  isSubmitting$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;

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
