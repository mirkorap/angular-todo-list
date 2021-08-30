import * as fromStore from '@shared/store';
import { GlobalStoreFacadeService } from './global-store-facade.service';
import { Injectable } from '@angular/core';
import { Message } from '@shared/entities/message';
import { MessageDto } from '@shared/data-transfer-objects/message';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Injectable()
export class NgrxGlobalFacadeService implements GlobalStoreFacadeService {
  error$: Observable<Message | Record<string, never>> = this.store
    .select(fromStore.selectError)
    .pipe(
      map((message) => {
        if (MessageDto.isValid(message)) {
          return MessageDto.fromObject(message).toDomain();
        }

        return {};
      })
    );

  success$: Observable<Message | Record<string, never>> = this.store
    .select(fromStore.selectSuccess)
    .pipe(
      map((message) => {
        if (MessageDto.isValid(message)) {
          return MessageDto.fromObject(message).toDomain();
        }

        return {};
      })
    );

  constructor(private store: Store<fromStore.GlobalState>) {}

  setErrorMessage(message: Message): void {
    const action = fromStore.setErrorMessage({
      message: MessageDto.fromDomain(message).toObject()
    });

    this.store.dispatch(action);
  }

  setSuccessMessage(message: Message): void {
    const action = fromStore.setSuccessMessage({
      message: MessageDto.fromDomain(message).toObject()
    });

    this.store.dispatch(action);
  }
}
