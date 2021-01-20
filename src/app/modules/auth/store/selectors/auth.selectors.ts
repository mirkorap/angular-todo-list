import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromReducer from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<fromReducer.AuthState>(
  fromReducer.authFeatureKey
);

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const isSubmitting = createSelector(
  selectAuthState,
  (state) => state.isSubmitting
);

export const isLoggedIn = createSelector(selectUser, (user) => !!user);
