import { InvalidEmailAddress } from '@auth/errors/invalid-email-address';
import { ValueObject } from '@shared/value-objects/value-object';
import { validateEmailAddress } from '@shared/validators/value-validators';

export class EmailAddress extends ValueObject<string> {
  protected _value: string;

  constructor(emailAddress: string) {
    super();

    if (!validateEmailAddress(emailAddress)) {
      throw new InvalidEmailAddress();
    }

    this._value = emailAddress;
  }
}
