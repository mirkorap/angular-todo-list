import * as fromActions from '@note/store/actions/note.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { INoteDto, NoteDto } from '@note/data-transfer-objects/note';
import { Injectable } from '@angular/core';
import { Note } from '@note/entities/note';
import { NoteFailure } from '@note/failures/note-failure';
import { NoteRepositoryService } from '@note/services/note-repository.service';
import { TypedAction } from '@ngrx/store/src/models';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class NoteEffects {
  constructor(
    private actions$: Actions,
    private noteRepository: NoteRepositoryService
  ) {}

  createNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.createNote),
      switchMap(async (action) => {
        const failureOrNote = await this.noteRepository.create(
          NoteDto.fromObject(action.note).toDomain()
        );

        return this.dispatchFailureOrSuccess(
          failureOrNote,
          fromActions.createNoteFail,
          fromActions.createNoteSuccess
        );
      })
    )
  );

  updateNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.updateNote),
      switchMap(async (action) => {
        const failureOrNote = await this.noteRepository.update(
          NoteDto.fromObject(action.note).toDomain()
        );

        return this.dispatchFailureOrSuccess(
          failureOrNote,
          fromActions.updateNoteFail,
          fromActions.updateNoteSuccess
        );
      })
    )
  );

  deleteNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.deleteNote),
      switchMap(async (action) => {
        const failureOrNote = await this.noteRepository.delete(
          NoteDto.fromObject(action.note).toDomain()
        );

        return this.dispatchFailureOrSuccess(
          failureOrNote,
          fromActions.deleteNoteFail,
          fromActions.deleteNoteSuccess
        );
      })
    )
  );

  private dispatchFailureOrSuccess(
    failureOrNote: NoteFailure | Note,
    failureAction: (props: { failure: NoteFailure }) => TypedAction<string>,
    successAction: (props: { note: INoteDto }) => TypedAction<string>
  ): TypedAction<string> {
    if (failureOrNote instanceof Note) {
      return successAction({
        note: NoteDto.fromDomain(failureOrNote).toObject()
      });
    }

    return failureAction({ failure: failureOrNote });
  }
}
