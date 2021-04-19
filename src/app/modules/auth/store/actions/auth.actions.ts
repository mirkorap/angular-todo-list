import { createAction, props } from '@ngrx/store';
import { AuthFailure } from '@auth/failures/auth-failure';
import { IUserDto } from '@auth/data-transfer-objects/user';

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

// authorize / unauthorize actions
export const authorize = createAction(
  '[Auth] Authorize User',
  props<{ user: IUserDto }>()
);

export const unauthorize = createAction(
  '[Auth] Unauthorize User',
  props<{ failure: AuthFailure }>()
);
