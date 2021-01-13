import { EmptyString } from '../errors/empty-string';
import { ValueObject } from './value-object';
import { v4 as uuid4 } from 'uuid';

export class UniqueId extends ValueObject<string> {
  constructor(uniqueId: string) {
    super();

    if (!this.validate(uniqueId)) {
      throw new EmptyString();
    }

    this._value = uniqueId;
  }

  static generate(): UniqueId {
    return new UniqueId(uuid4());
  }

  protected validate(value: string): boolean {
    return value.length > 0;
  }
}
