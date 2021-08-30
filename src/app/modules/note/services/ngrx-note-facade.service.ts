import * as fromStore from '@note/store';
import { INoteDto, NoteDto } from '@note/data-transfer-objects/note';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Dictionary } from '@ngrx/entity';
import { Injectable } from '@angular/core';
import { Note } from '@note/entities/note';
import { NoteFailure } from '@note/failures/note-failure';
import { NoteStoreFacadeService } from './note-store-facade.service';
import { Store } from '@ngrx/store';

@Injectable()
export class NgrxNoteFacadeService implements NoteStoreFacadeService {
  notes$: Observable<Note[]> = this.store
    .select(fromStore.selectNotes)
    .pipe(
      map((notes) => notes.map((note) => NoteDto.fromObject(note).toDomain()))
    );

  noteEntities$: Observable<Dictionary<Note>> = this.store
    .select(fromStore.selectNoteEntities)
    .pipe(
      map((entities) =>
        Object.entries(entities).reduce((acc, [id, entity]) => {
          const note = NoteDto.fromObject(entity as INoteDto).toDomain();
          return { ...acc, [id]: note };
        }, {})
      )
    );

  failure$: Observable<NoteFailure> = this.store
    .select(fromStore.selectFailure)
    .pipe(filter((failure): failure is NoteFailure => !!failure));

  isLoading$: Observable<boolean> = this.store.select(
    fromStore.selectIsLoading
  );

  isLoaded$: Observable<boolean> = this.store.select(fromStore.selectIsLoaded);

  constructor(private store: Store<fromStore.NoteState>) {}

  loadAllNotes(): void {
    this.store.dispatch(fromStore.loadAllNotes());
  }

  selectNoteOrCreate(id: string): Observable<Note> {
    return this.hasNote(id).pipe(
      switchMap((hasNote) => {
        return hasNote ? this.selectNote(id) : Note.empty().asObservable();
      })
    );
  }

  selectNote(id: string): Observable<Note> {
    return this.noteEntities$.pipe(
      switchMap((entities) => of(entities[id])),
      filter((note): note is Note => !!note)
    );
  }

  hasNote(id: string): Observable<boolean> {
    return this.noteEntities$.pipe(
      map((notes) => !!notes[id]),
      take(1)
    );
  }

  createNote(note: Note): void {
    this.store.dispatch(
      fromStore.createNote({ note: NoteDto.fromDomain(note).toObject() })
    );
  }

  updateNote(note: Note): void {
    this.store.dispatch(
      fromStore.updateNote({ note: NoteDto.fromDomain(note).toObject() })
    );
  }

  deleteNote(note: Note): void {
    this.store.dispatch(
      fromStore.deleteNote({ note: NoteDto.fromDomain(note).toObject() })
    );
  }

  upsertNote(note: Note): Observable<void> {
    return this.hasNote(note.id.value).pipe(
      map((hasNote) => {
        if (hasNote) {
          return this.updateNote(note);
        }

        return this.createNote(note);
      })
    );
  }
}
