import { EmptyString } from '@shared/errors/empty-string';
import { ValueObject } from './value-object';
import { v4 as uuid4 } from 'uuid';
import { validateStringNotEmpty } from '@shared/validators/value-validators';

export class UniqueId extends ValueObject<string> {
  protected _value: string;

  constructor(uniqueId: string) {
    super();

    if (!validateStringNotEmpty(uniqueId)) {
      throw new EmptyString();
    }

    this._value = uniqueId;
  }

  static generate(): UniqueId {
    return new UniqueId(uuid4());
  }
}
