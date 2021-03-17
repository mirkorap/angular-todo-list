import * as fromActions from '@auth/store/actions/auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
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
        const maybeFailure = await this.authService.registerWithEmailAndPassword(
          new EmailAddress(action.emailAddress),
          new Password(action.password)
        );

        return this.dispatchFailureOrSuccess(
          maybeFailure,
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
        const maybeFailure = await this.authService.signInWithEmailAndPassword(
          new EmailAddress(action.emailAddress),
          new Password(action.password)
        );

        return this.dispatchFailureOrSuccess(
          maybeFailure,
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
        const maybeFailure = await this.authService.signInWithGoogle();

        return this.dispatchFailureOrSuccess(
          maybeFailure,
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

  requestAuthCheck$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestAuthCheck),
      switchMap(() => {
        return this.authService.getCurrentUser().pipe(
          map((failureOrUser) => {
            if (failureOrUser instanceof User) {
              return fromActions.requestAuthCheckSuccess({
                user: UserDto.fromDomain(failureOrUser).toObject()
              });
            }

            return fromActions.requestAuthCheckFail({ failure: failureOrUser });
          })
        );
      })
    )
  );

  private dispatchFailureOrSuccess(
    maybeFailure: AuthFailure | void,
    failureAction: fromActions.failureActionType,
    successAction: fromActions.successActionType
  ): TypedAction<string> {
    if ((<any>Object).values(AuthFailure).includes(maybeFailure)) {
      return failureAction({ failure: maybeFailure as AuthFailure });
    }

    return successAction();
  }
}
