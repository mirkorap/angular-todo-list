import * as fromActions from '@auth/store/actions/auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IUserDto, UserDto } from '@auth/data-transfer-objects/user';
import { AuthFailure } from '@auth/failures/auth-failure';
import { AuthService } from '@auth/services';
import { EmailAddress } from '@auth/value-objects/email-address';
import { Injectable } from '@angular/core';
import { Password } from '@auth/value-objects/password';
import { Router } from '@angular/router';
import { TypedAction } from '@ngrx/store/src/models';
import { User } from '@auth/entities/user';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  registerWithEmailAndPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.registerWithEmailAndPassword),
      switchMap(async ({ credentials }) => {
        const failureOrUser =
          await this.authService.registerWithEmailAndPassword(
            new EmailAddress(credentials.emailAddress),
            new Password(credentials.password)
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
      switchMap(async ({ credentials }) => {
        const failureOrUser = await this.authService.signInWithEmailAndPassword(
          new EmailAddress(credentials.emailAddress),
          new Password(credentials.password)
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
        this.router.navigateByUrl('/auth');

        return fromActions.signOutSuccess();
      })
    )
  );

  private dispatchFailureOrSuccess(
    failureOrUser: AuthFailure | User,
    failureAction: (props: { failure: AuthFailure }) => TypedAction<string>,
    successAction: (props: { user: IUserDto }) => TypedAction<string>
  ): TypedAction<string> {
    if (failureOrUser instanceof User) {
      return successAction({
        user: UserDto.fromDomain(failureOrUser).toObject()
      });
    }

    return failureAction({ failure: failureOrUser });
  }
}
