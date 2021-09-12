import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Note } from '@note/entities/note';
import { NoteStoreFacadeService } from '@note/services';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class NoteFormResolver implements Resolve<Note> {
  constructor(private noteStoreFacade: NoteStoreFacadeService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Note> {
    const noteId: string = route.params.id;

    return this.noteStoreFacade.selectNoteOrCreate(noteId).pipe(take(1));
  }
}
