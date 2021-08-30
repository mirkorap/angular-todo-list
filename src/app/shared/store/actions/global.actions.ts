import { createAction, props } from '@ngrx/store';
import { IMessageDto } from '@shared/data-transfer-objects/message';

export const setErrorMessage = createAction(
  '[Global] Set Error Message',
  props<{ message: IMessageDto }>()
);

export const setSuccessMessage = createAction(
  '[Global] Set Success Message',
  props<{ message: IMessageDto }>()
);
