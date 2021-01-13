export abstract class ValueObject<T> {
  protected _value: T;

  get value(): T {
    return this._value;
  }

  protected abstract validate(value: T): boolean;
}
