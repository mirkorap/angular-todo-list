import { InvalidEmailAddress } from './../errors/invalid-email-address';
import { ValueObject } from '../../../shared/value-objects/value-object';

export class EmailAddress extends ValueObject<string> {
  protected _value: string;

  constructor(emailAddress: string) {
    super();

    if (!this.validate(emailAddress)) {
      throw new InvalidEmailAddress();
    }

    this._value = emailAddress;
  }

  protected validate(value: string): boolean {
    const emailRegex = /^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+/;
    return emailRegex.test(value);
  }
}
