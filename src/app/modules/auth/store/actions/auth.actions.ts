import { createAction, props } from '@ngrx/store';
import { AuthFailure } from './../../failures/auth-failure';
import { IUserDto } from './../../data-transfer-objects/user';
import { TypedAction } from '@ngrx/store/src/models';

// RegisterWithEmailAndPassword actions
export const registerWithEmailAndPassword = createAction(
  '[Auth] Register With Email And Password',
  props<{ emailAddress: string; password: string }>()
);

export const registerWithEmailAndPasswordSuccess = createAction(
  '[Auth] Register With Email And Password Success',
  props<{ user: IUserDto }>()
);

export const registerWithEmailAndPasswordFail = createAction(
  '[Auth] Register With Email And Password Fail',
  props<{ failure: AuthFailure }>()
);

// SignInWithEmailAndPassword actions
export const signInWithEmailAndPassword = createAction(
  '[Auth] Sign In With Email And Password',
  props<{ emailAddress: string; password: string }>()
);

export const signInWithEmailAndPasswordSuccess = createAction(
  '[Auth] Sign In With Email And Password Success',
  props<{ user: IUserDto }>()
);

export const signInWithEmailAndPasswordFail = createAction(
  '[Auth] Sign In With Email And Password Fail',
  props<{ failure: AuthFailure }>()
);

// SignInWithGoogle actions
export const signInWithGoogle = createAction('[Auth] Sign In With Google');

export const signInWithGoogleSuccess = createAction(
  '[Auth] Sign In With Google Success',
  props<{ user: IUserDto }>()
);

export const signInWithGoogleFail = createAction(
  '[Auth] Sign In With Google Fail',
  props<{ failure: AuthFailure }>()
);

// SignOut actions
export const signOut = createAction('[Auth] Sign Out');

export const signOutSuccess = createAction('[Auth] Sign Out Success');

export type failureActionType = (props: {
  failure: AuthFailure;
}) => TypedAction<string>;

export type successActionType = (props: {
  user: IUserDto;
}) => TypedAction<string>;
