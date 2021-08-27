import { Injectable } from '@angular/core';
import { Message } from '@shared/entities/message';
import { Observable } from 'rxjs';

@Injectable()
export abstract class GlobalStoreFacadeService {
  abstract error$: Observable<Message | Record<string, never>>;
  abstract success$: Observable<Message | Record<string, never>>;

  abstract setErrorMessage(message: Message): void;

  abstract setSuccessMessage(message: Message): void;
}
