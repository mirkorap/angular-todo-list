import * as fromReducer from '@auth/store/reducers/auth.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAuthState = createFeatureSelector<fromReducer.AuthState>(
  fromReducer.authFeatureKey
);

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectFailure = createSelector(
  selectAuthState,
  (state) => state.failure
);

export const isSubmitting = createSelector(
  selectAuthState,
  (state) => state.isSubmitting
);

export const isSignedIn = createSelector(selectUser, (user) => !!user.id);

export const showErrorMessage = createSelector(
  selectFailure,
  (failure) => !!failure
);
