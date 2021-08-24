import * as fromReducer from '@note/store/reducers/note.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { noteFailureMessageMap } from '@note/failures/note-failure';

const { selectAll, selectEntities } = fromReducer.adapter.getSelectors();

export const selectNoteState = createFeatureSelector<fromReducer.NoteState>(
  fromReducer.noteFeatureKey
);

export const selectNotes = createSelector(selectNoteState, selectAll);

export const selectNoteEntities = createSelector(
  selectNoteState,
  selectEntities
);

export const selectFailure = createSelector(
  selectNoteState,
  (state) => state.failure
);

export const selectFailureMessage = createSelector(selectFailure, (failure) => {
  return failure ? noteFailureMessageMap[failure] : null;
});

export const selectIsLoading = createSelector(
  selectNoteState,
  (state) => state.isLoading
);

export const selectIsLoaded = createSelector(
  selectNoteState,
  (state) => state.isLoaded
);
