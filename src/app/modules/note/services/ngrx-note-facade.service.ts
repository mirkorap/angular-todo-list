import * as fromStore from '@note/store';
import { INoteDto } from '@note/data-transfer-objects/note';
import { Injectable } from '@angular/core';
import { NoteStoreFacadeService } from './note-store-facade.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class NgrxNoteFacadeService implements NoteStoreFacadeService {
  notes$: Observable<INoteDto[]> = this.store.select(fromStore.selectNotes);

  failureMessage$: Observable<string | null> = this.store.select(
    fromStore.selectFailureMessage
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
}
