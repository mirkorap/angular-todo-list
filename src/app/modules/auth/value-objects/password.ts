import { ShortPassword } from './../errors/short-password';
import { ValueObject } from '../../../shared/value-objects/value-object';

export class Password extends ValueObject<string> {
  private static MIN_LENGTH = 6;

  constructor(password: string) {
    super();

    if (!this.validate(password)) {
      throw new ShortPassword(Password.MIN_LENGTH);
    }

    this._value = password;
  }

  protected validate(value: string): boolean {
    return value.length >= Password.MIN_LENGTH;
  }
}
