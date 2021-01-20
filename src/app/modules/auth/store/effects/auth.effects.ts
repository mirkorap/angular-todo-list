import * as fromActions from '../actions/auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { EmailAddress } from './../../value-objects/email-address';
import { Injectable } from '@angular/core';
import { Password } from './../../value-objects/password';
import { UserDto } from './../../data-transfer-objects/user';

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
              user: UserDto.fromDomain(user).toObject()
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
              user: UserDto.fromDomain(user).toObject()
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
              user: UserDto.fromDomain(user).toObject()
            })
          )
        );
      })
    )
  );
}
