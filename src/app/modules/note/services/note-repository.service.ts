import { Injectable } from '@angular/core';
import { Note } from '@note/entities/note';
import { NoteFailure } from '@note/failures/note-failure';
import { Observable } from 'rxjs';

@Injectable()
export abstract class NoteRepositoryService {
  abstract watchAll(): Observable<NoteFailure | Note[]>;

  abstract watchUncompleted(): Observable<NoteFailure | Note[]>;

  abstract create(note: Note): Promise<NoteFailure | Note>;

  abstract update(note: Note): Promise<NoteFailure | Note>;

  abstract delete(note: Note): Promise<NoteFailure | Note>;
}
