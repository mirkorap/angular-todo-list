import { ShortPassword } from '@auth/errors/short-password';
import { ValueObject } from '@shared/value-objects/value-object';
import { validatePassword } from '@shared/validators/value-validators';

export class Password extends ValueObject<string> {
  protected _value: string;

  private static MIN_LENGTH = 6;

  constructor(password: string) {
    super();

    if (!validatePassword(password)) {
      throw new ShortPassword(Password.MIN_LENGTH);
    }

    this._value = password;
  }
}
