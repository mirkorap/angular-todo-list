import { take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NoteStoreFacadeService } from '@note/services';
import { Observable } from 'rxjs';
import { Resolve } from '@angular/router';

@Injectable()
export class NoteStateResolver implements Resolve<boolean> {
  constructor(private noteStoreFacade: NoteStoreFacadeService) {}

  resolve(): Observable<boolean> {
    return this.noteStoreFacade.isLoaded$.pipe(
      tap((isLoaded) => !isLoaded && this.noteStoreFacade.loadAllNotes()),
      take(1)
    );
  }
}
