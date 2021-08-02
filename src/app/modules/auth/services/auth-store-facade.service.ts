import { AuthFailure } from '@auth/failures/auth-failure';
import { ICredentialsDto } from '@auth/data-transfer-objects/credentials';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@auth/entities/user';

@Injectable()
export abstract class AuthStoreFacadeService {
  abstract user$: Observable<User | Record<string, never>>;
  abstract failureMessage$: Observable<string>;
  abstract isSubmitting$: Observable<boolean>;
  abstract isSignedIn$: Observable<boolean>;

  abstract registerWithEmailAndPassword(credentials: ICredentialsDto): void;

  abstract signInWithEmailAndPassword(credentials: ICredentialsDto): void;

  abstract signInWithGoogle(): void;

  abstract signOut(): void;

  abstract authorize(user: User): void;

  abstract unauthorize(failure: AuthFailure): void;
}
