import { ListTooLong } from '@shared/errors/list-too-long';
import { ValueObject } from './value-object';
import { validateMaxListLength } from '@shared/validators/value-validators';

export class LimitedList<T> extends ValueObject<T[]> {
  protected _value: T[];

  constructor(valueList: T[], maxLength: number) {
    super();

    if (!validateMaxListLength(valueList, maxLength)) {
      throw new ListTooLong(maxLength);
    }

    this._value = valueList;
  }
}
