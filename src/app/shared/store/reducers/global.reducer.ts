import * as fromActions from '@shared/store/actions/global.actions';
import { createReducer, on } from '@ngrx/store';
import { IMessageDto } from '@shared/data-transfer-objects/message';

export interface GlobalState {
  error: IMessageDto | Record<string, never>;
  success: IMessageDto | Record<string, never>;
}

export const initialState: GlobalState = {
  error: {},
  success: {}
};

export const globalFeatureKey = 'global';

export const globalReducer = createReducer(
  initialState,
  on(fromActions.setErrorMessage, (state, action) => ({
    ...state,
    error: action.message
  })),
  on(fromActions.setSuccessMessage, (state, action) => ({
    ...state,
    success: action.message
  }))
);
