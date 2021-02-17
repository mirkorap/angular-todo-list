import * as fromActions from '@auth/store/actions/auth.actions';
import { createReducer, on } from '@ngrx/store';
import { AuthFailure } from '@auth/failures/auth-failure';
import { IUserDto } from '@auth/data-transfer-objects/user';

export interface AuthState {
  user: IUserDto | Record<string, never>;
  failure: AuthFailure | null;
  isSubmitting: boolean;
}

export const initialState: AuthState = {
  user: {},
  failure: null,
  isSubmitting: false
};

export const authFeatureKey = 'auth';

export const authReducer = createReducer(
  initialState,
  on(
    fromActions.registerWithEmailAndPassword,
    fromActions.signInWithEmailAndPassword,
    fromActions.signInWithGoogle,
    fromActions.signOut,
    (state) => ({
      ...state,
      isSubmitting: true
    })
  ),
  on(
    fromActions.registerWithEmailAndPasswordSuccess,
    fromActions.signInWithEmailAndPasswordSuccess,
    fromActions.signInWithGoogleSuccess,
    (_, action) => ({
      user: action.user,
      failure: null,
      isSubmitting: false
    })
  ),
  on(
    fromActions.registerWithEmailAndPasswordFail,
    fromActions.signInWithEmailAndPasswordFail,
    fromActions.signInWithGoogleFail,
    (_, action) => ({
      user: {},
      failure: action.failure,
      isSubmitting: false
    })
  ),
  on(fromActions.signOutSuccess, () => ({
    ...initialState
  }))
);
