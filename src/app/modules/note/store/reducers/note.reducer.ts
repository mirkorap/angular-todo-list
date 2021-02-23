import * as fromActions from '@note/store/actions/note.actions';
import { createReducer, on } from '@ngrx/store';
import { INoteDto } from '@note/data-transfer-objects/note';
import { NoteFailure } from '@note/failures/note-failure';

export interface NoteState {
  notes: INoteDto[];
  failure: NoteFailure | null;
  isLoading: boolean;
  isLoaded: boolean;
}

export const initialState: NoteState = {
  notes: [],
  failure: null,
  isLoading: false,
  isLoaded: false
};

export const noteFeatureKey = 'note';

export const noteReducer = createReducer(
  initialState,
  on(fromActions.loadAllNotes, fromActions.loadUncompletedNotes, (state) => ({
    ...state,
    isLoading: true
  })),
  on(
    fromActions.loadAllNotesSuccess,
    fromActions.loadUncompletedNotesSuccess,
    (_, action) => ({
      notes: action.notes,
      failure: null,
      isLoading: false,
      isLoaded: true
    })
  ),
  on(
    fromActions.loadAllNotesFail,
    fromActions.loadUncompletedNotesFail,
    (state, action) => ({
      ...state,
      failure: action.failure,
      isLoading: false,
      isLoaded: false
    })
  )
);
