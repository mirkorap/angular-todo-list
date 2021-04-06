import { INoteDto } from '@note/data-transfer-objects/note';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class NoteStoreFacadeService {
  abstract notes$: Observable<INoteDto[]>;
  abstract failureMessage$: Observable<string>;
  abstract isLoading$: Observable<boolean>;
  abstract isLoaded$: Observable<boolean>;

  abstract loadAllNotes(): void;

  abstract loadUncompletedNotes(): void;
}
