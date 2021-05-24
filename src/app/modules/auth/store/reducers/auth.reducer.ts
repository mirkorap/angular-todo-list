import * as fromActions from '@auth/store/actions/auth.actions';
import { createReducer, on } from '@ngrx/store';
import { AuthFailure } from '@auth/failures/auth-failure';
import { IUserDto } from '@auth/data-transfer-objects/user';

export interface AuthState {
  user: IUserDto | Record<string, never>;
  failure: AuthFailure | null;
  isSubmitting: boolean;
  isSignedIn: boolean;
}

export const initialState: AuthState = {
  user: {},
  failure: null,
  isSubmitting: false,
  isSignedIn: false
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
    fromActions.authorize,
    (state, action) => ({
      ...state,
      user: action.user,
      isSubmitting: false,
      isSignedIn: true
    })
  ),
  on(
    fromActions.registerWithEmailAndPasswordFail,
    fromActions.signInWithEmailAndPasswordFail,
    fromActions.signInWithGoogleFail,
    fromActions.unauthorize,
    (state, action) => ({
      ...state,
      failure: action.failure,
      isSubmitting: false,
      isSignedIn: false
    })
  ),
  on(fromActions.signOutSuccess, () => ({
    ...initialState
  }))
);
