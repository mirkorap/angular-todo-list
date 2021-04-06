import { createAction, props } from '@ngrx/store';
import { INoteDto } from '@note/data-transfer-objects/note';
import { NoteFailure } from '@note/failures/note-failure';
import { TypedAction } from '@ngrx/store/src/models';

// LoadAllNotes actions
export const loadAllNotes = createAction('[Note] Load All Notes');

export const loadAllNotesSuccess = createAction(
  '[Note] Load All Notes Success',
  props<{ notes: INoteDto[] }>()
);

export const loadAllNotesFail = createAction(
  '[Note] Load All Notes Fail',
  props<{ failure: NoteFailure }>()
);

// LoadUncompletedNotes actions
export const loadUncompletedNotes = createAction(
  '[Note] Load Uncompleted Notes'
);

export const loadUncompletedNotesSuccess = createAction(
  '[Note] Load Uncompleted Notes Success',
  props<{ notes: INoteDto[] }>()
);

export const loadUncompletedNotesFail = createAction(
  '[Note] Load Uncompleted Notes Fail',
  props<{ failure: NoteFailure }>()
);

export type failureActionType = (props: {
  failure: NoteFailure;
}) => TypedAction<string>;

export type successActionType = (props: {
  notes: INoteDto[];
}) => TypedAction<string>;
