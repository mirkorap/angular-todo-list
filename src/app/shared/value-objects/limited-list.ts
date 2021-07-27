import { Equatable } from '@shared/core/equatable';
import { ListTooLong } from '@shared/errors/list-too-long';
import { ValueObject } from './value-object';
import { validateMaxListLength } from '@shared/validators/value-validators';

export class LimitedList<T extends Equatable> extends ValueObject<T[]> {
  protected _value: T[];
  protected _maxLength: number;

  constructor(valueList: T[], maxLength: number) {
    super();

    if (!validateMaxListLength(valueList, maxLength)) {
      throw new ListTooLong(maxLength);
    }

    this._value = valueList;
    this._maxLength = maxLength;
  }

  static empty<T extends Equatable>(maxLength: number): LimitedList<T> {
    return new LimitedList<T>([], maxLength);
  }

  get maxLength(): number {
    return this._maxLength;
  }

  add(valueToAdd: T): LimitedList<T> {
    const valueList = [...this.value, valueToAdd];

    return new LimitedList<T>(valueList, this.maxLength);
  }

  update(valueToUpdate: T): LimitedList<T> {
    const valueList = this.value.map((item) =>
      item.equalsTo(valueToUpdate) ? valueToUpdate : item
    );

    return new LimitedList<T>(valueList, this.maxLength);
  }

  remove(valueToRemove: T): LimitedList<T> {
    const valueList = this.value.filter(
      (item) => !item.equalsTo(valueToRemove)
    );

    return new LimitedList<T>(valueList, this.maxLength);
  }

  equalsTo(objectToCompare: this): boolean {
    return this.value.every((item, index) =>
      item.equalsTo(objectToCompare.value[index])
    );
  }
}
