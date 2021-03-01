import * as fromActions from '@note/store/actions/note.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Note } from '@note/entities/note';
import { NoteDto } from '@note/data-transfer-objects/note';
import { NoteFailure } from '@note/failures/note-failure';
import { NoteRepositoryService } from '@note/services/note-repository.service';
import { TypedAction } from '@ngrx/store/src/models';

@Injectable()
export class NoteEffects {
  constructor(
    private actions$: Actions,
    private noteRepository: NoteRepositoryService
  ) {}

  loadAllNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadAllNotes),
      switchMap(() => {
        return this.noteRepository.watchAll().pipe(
          map((failureOrNotes) => {
            return this.dispatchFailureOrSuccess(
              failureOrNotes,
              fromActions.loadAllNotesFail,
              fromActions.loadAllNotesSuccess
            );
          })
        );
      })
    )
  );

  loadUncompletedNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadUncompletedNotes),
      switchMap(() => {
        return this.noteRepository.watchUncompleted().pipe(
          map((failureOrNotes) => {
            return this.dispatchFailureOrSuccess(
              failureOrNotes,
              fromActions.loadUncompletedNotesFail,
              fromActions.loadUncompletedNotesSuccess
            );
          })
        );
      })
    )
  );

  private dispatchFailureOrSuccess(
    failureOrNotes: NoteFailure | Note[],
    failureAction: fromActions.failureActionType,
    successAction: fromActions.successActionType
  ): TypedAction<string> {
    if (Array.isArray(failureOrNotes)) {
      const notes = failureOrNotes.map((note) =>
        NoteDto.fromDomain(note).toObject()
      );

      return successAction({ notes });
    }

    return failureAction({ failure: failureOrNotes });
  }
}