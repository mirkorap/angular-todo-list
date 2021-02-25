import * as fromActions from '@note/store/actions/note.actions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { INoteDto } from '@note/data-transfer-objects/note';
import { NoteFailure } from '@note/failures/note-failure';

export interface NoteState extends EntityState<INoteDto> {
  failure: NoteFailure | null;
  isLoading: boolean;
  isLoaded: boolean;
}

export const adapter: EntityAdapter<INoteDto> = createEntityAdapter<INoteDto>();

export const initialState: NoteState = adapter.getInitialState({
  failure: null,
  isLoading: false,
  isLoaded: false
});

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
    (state, action) => {
      return adapter.setAll(action.notes, {
        ...state,
        failure: null,
        isLoading: false,
        isLoaded: true
      });
    }
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
