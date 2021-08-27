import * as fromReducer from '@shared/store/reducers/global.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectGlobalState = createFeatureSelector<fromReducer.GlobalState>(
  fromReducer.globalFeatureKey
);

export const selectError = createSelector(
  selectGlobalState,
  (state) => state.error
);

export const selectSuccess = createSelector(
  selectGlobalState,
  (state) => state.success
);
