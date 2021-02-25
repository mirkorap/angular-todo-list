import * as fromReducer from '@note/store/reducers/note.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectNoteState = createFeatureSelector<fromReducer.NoteState>(
  fromReducer.noteFeatureKey
);

const { selectAll } = fromReducer.adapter.getSelectors();

export const selectNotes = createSelector(selectNoteState, selectAll);

export const selectFailure = createSelector(
  selectNoteState,
  (state) => state.failure
);

export const selectIsLoading = createSelector(
  selectNoteState,
  (state) => state.isLoading
);

export const selectIsLoaded = createSelector(
  selectNoteState,
  (state) => state.isLoaded
);

export const showErrorMessage = createSelector(
  selectFailure,
  (failure) => !!failure
);
