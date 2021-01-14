import { User } from './../../data-transfer-objects/user';
import { createAction, props } from '@ngrx/store';

export const registerWithEmailAndPassword = createAction(
  '[Auth] Register With Email And Password',
  props<{ emailAddress: string; password: string }>()
);

export const registerWithEmailAndPasswordSuccess = createAction(
  '[Auth] Register With Email And Password Success',
  props<{ user: User }>()
);

export const signInWithEmailAndPassword = createAction(
  '[Auth] Sign In With Email And Password',
  props<{ emailAddress: string; password: string }>()
);

export const signInWithEmailAndPasswordSuccess = createAction(
  '[Auth] Sign In With Email And Password Success',
  props<{ user: User }>()
);

export const signInWithGoogle = createAction('[Auth] Sign In With Google');

export const signInWithGoogleSuccess = createAction(
  '[Auth] Sign In With Google Success',
  props<{ user: User }>()
);
