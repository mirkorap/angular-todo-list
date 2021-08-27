export enum AuthFailure {
  EMAIL_ALREADY_IN_USE = 1,
  INVALID_EMAIL_AND_PASSWORD,
  CANCELLED_BY_USER,
  USER_NOT_SIGNED_IN,
  SERVER_ERROR
}

export const failureMessageMap = {
  [AuthFailure.EMAIL_ALREADY_IN_USE]: 'Email already in use',
  [AuthFailure.INVALID_EMAIL_AND_PASSWORD]: 'Invalid email and password',
  [AuthFailure.CANCELLED_BY_USER]: 'Cancelled',
  [AuthFailure.USER_NOT_SIGNED_IN]: 'User not signed-in',
  [AuthFailure.SERVER_ERROR]: 'Server error'
};
