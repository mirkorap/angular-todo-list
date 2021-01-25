import * as fromActions from '../actions/auth.actions';
import { createReducer, on } from '@ngrx/store';
import { IUserDto } from './../../data-transfer-objects/user';

export interface AuthState {
  user: IUserDto;
  isSubmitting: boolean;
}

export const initialState: AuthState = {
  user: null,
  isSubmitting: false
};

export const authFeatureKey = 'auth';

export const authReducer = createReducer(
  initialState,
  on(
    fromActions.registerWithEmailAndPassword,
    fromActions.signInWithEmailAndPassword,
    fromActions.signInWithGoogle,
    (state) => ({
      ...state,
      isSubmitting: true
    })
  ),
  on(
    fromActions.registerWithEmailAndPasswordSuccess,
    fromActions.signInWithEmailAndPasswordSuccess,
    fromActions.signInWithGoogleSuccess,
    (state, action) => ({
      ...state,
      user: action.user,
      isSubmitting: false
    })
  )
);
