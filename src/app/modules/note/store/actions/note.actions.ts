import { createAction, props } from '@ngrx/store';
import { INoteDto } from '@note/data-transfer-objects/note';
import { NoteFailure } from '@note/failures/note-failure';

// CreateNote actions
export const createNote = createAction(
  '[Note] Create Note',
  props<{ note: INoteDto }>()
);

export const createNoteSuccess = createAction(
  '[Note] Create Note Success',
  props<{ note: INoteDto }>()
);

export const createNoteFail = createAction(
  '[Note] Create Note Fail',
  props<{ failure: NoteFailure }>()
);

// UpdateNote actions
export const updateNote = createAction(
  '[Note] Update Note',
  props<{ note: INoteDto }>()
);

export const updateNoteSuccess = createAction(
  '[Note] Update Note Success',
  props<{ note: INoteDto }>()
);

export const updateNoteFail = createAction(
  '[Note] Update Note Fail',
  props<{ failure: NoteFailure }>()
);

// DeleteNote actions
export const deleteNote = createAction(
  '[Note] Delete Note',
  props<{ note: INoteDto }>()
);

export const deleteNoteSuccess = createAction(
  '[Note] Delete Note Success',
  props<{ note: INoteDto }>()
);

export const deleteNoteFail = createAction(
  '[Note] Delete Note Fail',
  props<{ failure: NoteFailure }>()
);
