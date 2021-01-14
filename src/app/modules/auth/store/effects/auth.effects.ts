import { UserDto } from './../../data-transfer-objects/user';
import { map, tap } from 'rxjs/operators';
import { Password } from './../../value-objects/password';
import { EmailAddress } from './../../value-objects/email-address';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import * as fromActions from '../actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  registerWithEmailAndPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.registerWithEmailAndPassword),
      tap(async (action) => {
        await this.authService.registerWithEmailAndPassword(
          new EmailAddress(action.emailAddress),
          new Password(action.password)
        );

        this.authService.getSignedInUser().pipe(
          map((user) =>
            fromActions.registerWithEmailAndPasswordSuccess({
              user: UserDto.fromDomain(user).toPlainObject()
            })
          )
        );
      })
    )
  );

  signInWithEmailAndPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.signInWithEmailAndPassword),
      tap(async (action) => {
        await this.authService.signInWithEmailAndPassword(
          new EmailAddress(action.emailAddress),
          new Password(action.password)
        );

        this.authService.getSignedInUser().pipe(
          map((user) =>
            fromActions.signInWithEmailAndPasswordSuccess({
              user: UserDto.fromDomain(user).toPlainObject()
            })
          )
        );
      })
    )
  );

  signInWithGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.signInWithGoogle),
      tap(async () => {
        await this.authService.signInWithGoogle();

        this.authService.getSignedInUser().pipe(
          map((user) =>
            fromActions.signInWithGoogleSuccess({
              user: UserDto.fromDomain(user).toPlainObject()
            })
          )
        );
      })
    )
  );
}
