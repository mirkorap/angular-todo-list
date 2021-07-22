export function validateStringNotEmpty(value: string): boolean {
  return value.length > 0;
}

export function validateMaxStringLength(
  value: string,
  maxLength: number
): boolean {
  return value.length <= maxLength;
}

export function validateSingleLine(value: string): boolean {
  return !value.includes('\n');
}

export function validateEmailAddress(value: string): boolean {
  const emailRegex =
    /^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+/;
  return emailRegex.test(value);
}

export function validatePassword(value: string): boolean {
  return value.length >= 6;
}

export function validateChoice<T>(value: T, choices: T[]): boolean {
  return choices.includes(value);
}

export function validateMaxListLength<T>(
  values: T[],
  maxLength: number
): boolean {
  return values.length <= maxLength;
}
