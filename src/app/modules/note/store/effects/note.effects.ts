import * as fromActions from '@note/store/actions/note.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { INoteDto, NoteDto } from '@note/data-transfer-objects/note';
import { NoteFailure, failureMessageMap } from '@note/failures/note-failure';
import { switchMap, tap } from 'rxjs/operators';
import { GlobalStoreFacadeService } from '@shared/services';
import { Injectable } from '@angular/core';
import { Message } from '@shared/entities/message';
import { Note } from '@note/entities/note';
import { NoteRepositoryService } from '@note/services';
import { TypedAction } from '@ngrx/store/src/models';
import { UniqueId } from '@shared/value-objects/uuid';

@Injectable()
export class NoteEffects {
  constructor(
    private actions$: Actions,
    private noteRepository: NoteRepositoryService,
    private globalStoreFacade: GlobalStoreFacadeService
  ) {}

  failure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromActions.createNoteFail,
          fromActions.updateNoteFail,
          fromActions.deleteNoteFail
        ),
        tap(({ failure }) => {
          const message = Message.error(
            UniqueId.generate(),
            failureMessageMap[failure]
          );

          this.globalStoreFacade.setErrorMessage(message);
        })
      ),
    { dispatch: false }
  );

  success$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromActions.createNoteSuccess,
          fromActions.updateNoteSuccess,
          fromActions.deleteNoteSuccess
        ),
        tap(() => {
          const message = Message.error(
            UniqueId.generate(),
            'Operation completed successfully'
          );

          this.globalStoreFacade.setSuccessMessage(message);
        })
      ),
    { dispatch: false }
  );

  createNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.createNote),
      switchMap(async ({ note }) => {
        const failureOrNote = await this.noteRepository.create(
          NoteDto.fromObject(note).toDomain()
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
      switchMap(async ({ note }) => {
        const failureOrNote = await this.noteRepository.update(
          NoteDto.fromObject(note).toDomain()
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
      switchMap(async ({ note }) => {
        const failureOrNote = await this.noteRepository.delete(
          NoteDto.fromObject(note).toDomain()
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
