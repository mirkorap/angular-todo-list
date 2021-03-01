export enum NoteFailure {
  UNABLE_TO_UPDATE = 1,
  INSUFFICIENT_PERMISSIONS,
  SERVER_ERROR
}

export const noteFailureMessageMap = {
  [NoteFailure.UNABLE_TO_UPDATE]: 'Unable to update',
  [NoteFailure.INSUFFICIENT_PERMISSIONS]: 'Insufficient permissions',
  [NoteFailure.SERVER_ERROR]: 'Unexpected error occurred during the operation'
};
