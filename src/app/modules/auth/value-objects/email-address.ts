import { ValueObject } from '../../../shared/value-objects/value-object';
import { InvalidEmailAddress } from './../errors/invalid-email-address';

export class EmailAddress extends ValueObject<string> {
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
