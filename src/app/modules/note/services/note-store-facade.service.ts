import { Injectable } from '@angular/core';
import { Note } from '@note/entities/note';
import { Observable } from 'rxjs';

@Injectable()
export abstract class NoteStoreFacadeService {
  abstract notes$: Observable<Note[]>;
  abstract failureMessage$: Observable<string>;
  abstract isLoading$: Observable<boolean>;
  abstract isLoaded$: Observable<boolean>;

  abstract loadAllNotes(): void;

  abstract loadUncompletedNotes(): void;

  abstract createNote(note: Note): void;

  abstract updateNote(note: Note): void;

  abstract deleteNote(note: Note): void;
}
