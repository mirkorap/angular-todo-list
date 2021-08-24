import * as fromActions from '@note/store/actions/note-overview.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { INoteDto, NoteDto } from '@note/data-transfer-objects/note';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Note } from '@note/entities/note';
import { NoteFailure } from '@note/failures/note-failure';
import { NoteRepositoryService } from '@note/services';
import { TypedAction } from '@ngrx/store/src/models';

@Injectable()
export class NoteOverviewEffects {
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

  private dispatchFailureOrSuccess(
    failureOrNotes: NoteFailure | Note[],
    failureAction: (props: { failure: NoteFailure }) => TypedAction<string>,
    successAction: (props: { notes: INoteDto[] }) => TypedAction<string>
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
