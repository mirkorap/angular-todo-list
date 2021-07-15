import * as fromStore from '@note/store';
import { INoteDto, NoteDto } from '@note/data-transfer-objects/note';
import { Observable, combineLatest, of } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Dictionary } from '@ngrx/entity';
import { Injectable } from '@angular/core';
import { Note } from '@note/entities/note';
import { NoteStoreFacadeService } from './note-store-facade.service';
import { Store } from '@ngrx/store';

@Injectable()
export class NgrxNoteFacadeService implements NoteStoreFacadeService {
  notes$: Observable<Note[]> = this.store
    .select(fromStore.selectNotes)
    .pipe(
      map((notes) => notes.map((note) => NoteDto.fromObject(note).toDomain()))
    );

  noteEntities$: Observable<Dictionary<Note>> = combineLatest([
    this.store.select(fromStore.selectNoteEntities),
    this.store.select(fromStore.selectNoteIds)
  ]).pipe(
    switchMap(([entities, ids]) => {
      return (ids as string[]).map((id) => {
        const entity = entities[id] as INoteDto;
        return { [id]: NoteDto.fromObject(entity).toDomain() };
      });
    })
  );

  failureMessage$: Observable<string> = this.store
    .select(fromStore.selectFailureMessage)
    .pipe(
      filter((failureMessage): failureMessage is string => !!failureMessage)
    );

  isLoading$: Observable<boolean> = this.store.select(
    fromStore.selectIsLoading
  );

  isLoaded$: Observable<boolean> = this.store.select(fromStore.selectIsLoaded);

  constructor(private store: Store<fromStore.NoteState>) {}

  loadAllNotes(): void {
    this.store.dispatch(fromStore.loadAllNotes());
  }

  loadUncompletedNotes(): void {
    this.store.dispatch(fromStore.loadUncompletedNotes());
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

  upsertNote(note: Note): void {
    this.hasNote(note.id.value).subscribe((hasNote) => {
      if (hasNote) {
        return this.updateNote(note);
      }

      return this.createNote(note);
    });
  }
}
