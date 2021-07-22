import { Equatable } from '@shared/core/equatable';

export abstract class ValueObject<T> implements Equatable {
  protected abstract _value: T;

  get value(): T {
    return this._value;
  }

  equalsTo(objectToCompare: this): boolean {
    return this.value === objectToCompare.value;
  }
}
