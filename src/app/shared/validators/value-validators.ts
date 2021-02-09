export function validateStringNotEmpty(value: string): boolean {
  return value.length > 0;
}

export function validateEmailAddress(value: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+/;
  return emailRegex.test(value);
}

export function validatePassword(value: string): boolean {
  return value.length >= 6;
}
