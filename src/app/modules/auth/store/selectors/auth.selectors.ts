import * as fromReducer from '../reducers/auth.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

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
