import { createAction, props } from '@ngrx/store';
import { INoteDto } from '@note/data-transfer-objects/note';
import { NoteFailure } from '@note/failures/note-failure';

// LoadAllNotes actions
export const loadAllNotes = createAction('[Note Overview] Load All Notes');

export const loadAllNotesSuccess = createAction(
  '[Note Overview] Load All Notes Success',
  props<{ notes: INoteDto[] }>()
);

export const loadAllNotesFail = createAction(
  '[Note Overview] Load All Notes Fail',
  props<{ failure: NoteFailure }>()
);
