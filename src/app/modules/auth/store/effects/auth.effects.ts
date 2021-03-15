import * as fromActions from '@auth/store/actions/auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, tap } from 'rxjs/operators';
import { AuthFailure } from '@auth/failures/auth-failure';
import { AuthService } from '@auth/services/auth.service';
import { EmailAddress } from '@auth/value-objects/email-address';
import { Injectable } from '@angular/core';
import { Password } from '@auth/value-objects/password';
import { TypedAction } from '@ngrx/store/src/models';
import { User } from '@auth/entities/user';
import { UserDto } from '@auth/data-transfer-objects/user';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  registerWithEmailAndPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.registerWithEmailAndPassword),
      switchMap(async (action) => {
        const failureOrUser = await this.authService.registerWithEmailAndPassword(
          new EmailAddress(action.emailAddress),
          new Password(action.password)
        );

        return this.dispatchFailureOrSuccess(
          failureOrUser,
          fromActions.registerWithEmailAndPasswordFail,
          fromActions.registerWithEmailAndPasswordSuccess
        );
      })
    )
  );

  signInWithEmailAndPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.signInWithEmailAndPassword),
      switchMap(async (action) => {
        const failureOrUser = await this.authService.signInWithEmailAndPassword(
          new EmailAddress(action.emailAddress),
          new Password(action.password)
        );

        return this.dispatchFailureOrSuccess(
          failureOrUser,
          fromActions.signInWithEmailAndPasswordFail,
          fromActions.signInWithEmailAndPasswordSuccess
        );
      })
    )
  );

  signInWithGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.signInWithGoogle),
      switchMap(async () => {
        const failureOrUser = await this.authService.signInWithGoogle();

        return this.dispatchFailureOrSuccess(
          failureOrUser,
          fromActions.signInWithGoogleFail,
          fromActions.signInWithGoogleSuccess
        );
      })
    )
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.signOut),
      switchMap(async () => {
        await this.authService.signOut();

        return fromActions.signOutSuccess();
      })
    )
  );

  private dispatchFailureOrSuccess(
    failureOrUser: AuthFailure | User,
    failureAction: fromActions.failureActionType,
    successAction: fromActions.successActionType
  ): TypedAction<string> {
    if (failureOrUser instanceof User) {
      return successAction({
        user: UserDto.fromDomain(failureOrUser).toObject()
      });
    }

    return failureAction({ failure: failureOrUser });
  }
}
