export abstract class ValueObject<T> {
  protected abstract _value: T;

  get value(): T {
    return this._value;
  }
}
