import {
  validateMaxStringLength,
  validateSingleLine,
  validateStringNotEmpty
} from '@shared/validators/value-validators';
import { EmptyString } from '@shared/errors/empty-string';
import { ExceedingLength } from '@shared/errors/exceeding-length';
import { MultilineString } from '@shared/errors/multiline-string';
import { ValueObject } from '@shared/value-objects/value-object';

export class TodoName extends ValueObject<string> {
  public static MAX_LENGTH = 30;

  protected _value: string;

  constructor(todoName: string) {
    super();

    if (!validateStringNotEmpty(todoName)) {
      throw new EmptyString();
    }

    if (!validateMaxStringLength(todoName, TodoName.MAX_LENGTH)) {
      throw new ExceedingLength(TodoName.MAX_LENGTH);
    }

    if (!validateSingleLine(todoName)) {
      throw new MultilineString();
    }

    this._value = todoName;
  }
}
