import { INoteDto } from '@note/data-transfer-objects/note';
import { Injectable } from '@angular/core';
import { NoteFailure } from '@note/failures/note-failure';
import { Observable } from 'rxjs';

@Injectable()
export abstract class NoteStoreFacadeService {
  abstract notes$: Observable<INoteDto[]>;
  abstract failure$: Observable<NoteFailure | null>;
  abstract isLoading$: Observable<boolean>;
  abstract isLoaded$: Observable<boolean>;
  abstract showErrorMessage$: Observable<boolean>;

  abstract loadAllNotes(): void;

  abstract loadUncompletedNotes(): void;
}
