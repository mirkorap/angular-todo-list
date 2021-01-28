import * as fromActions from '../actions/auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { EmailAddress } from './../../value-objects/email-address';
import { Injectable } from '@angular/core';
import { Password } from './../../value-objects/password';
import { User } from './../../entities/user';
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

        this.dispatchFailureOrSuccess(
          fromActions.registerWithEmailAndPasswordFail,
          fromActions.registerWithEmailAndPasswordSuccess
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

        this.dispatchFailureOrSuccess(
          fromActions.signInWithEmailAndPasswordFail,
          fromActions.signInWithEmailAndPasswordSuccess
        );
      })
    )
  );

  signInWithGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.signInWithGoogle),
      tap(async () => {
        await this.authService.signInWithGoogle();

        this.dispatchFailureOrSuccess(
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
    failureAction: fromActions.failureActionType,
    successAction: fromActions.successActionType
  ): void {
    this.authService.getSignedInUser().pipe(
      map((failureOrUser) => {
        if (failureOrUser instanceof User) {
          return successAction({
            user: UserDto.fromDomain(failureOrUser).toObject()
          });
        }

        return failureAction({ failure: failureOrUser });
      })
    );
  }
}
