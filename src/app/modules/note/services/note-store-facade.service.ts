import { Dictionary } from '@ngrx/entity';
import { Injectable } from '@angular/core';
import { Note } from '@note/entities/note';
import { NoteFailure } from '@note/failures/note-failure';
import { Observable } from 'rxjs';

@Injectable()
export abstract class NoteStoreFacadeService {
  abstract notes$: Observable<Note[]>;
  abstract noteEntities$: Observable<Dictionary<Note>>;
  abstract failure$: Observable<NoteFailure>;
  abstract isLoading$: Observable<boolean>;
  abstract isLoaded$: Observable<boolean>;

  abstract loadAllNotes(): void;

  abstract selectNoteOrCreate(id: string): Observable<Note>;

  abstract selectNote(id: string): Observable<Note>;

  abstract hasNote(id: string): Observable<boolean>;

  abstract createNote(note: Note): void;

  abstract updateNote(note: Note): void;

  abstract deleteNote(note: Note): void;

  abstract upsertNote(note: Note): Observable<void>;
}
