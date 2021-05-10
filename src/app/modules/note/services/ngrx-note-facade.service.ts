import * as fromStore from '@note/store';
import { filter, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Note } from '@note/entities/note';
import { NoteDto } from '@note/data-transfer-objects/note';
import { NoteStoreFacadeService } from './note-store-facade.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class NgrxNoteFacadeService implements NoteStoreFacadeService {
  notes$: Observable<Note[]> = this.store
    .select(fromStore.selectNotes)
    .pipe(
      map((notes) => notes.map((note) => NoteDto.fromObject(note).toDomain()))
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
}
