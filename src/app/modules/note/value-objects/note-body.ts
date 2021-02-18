import {
  validateMaxStringLength,
  validateStringNotEmpty
} from '@shared/validators/value-validators';
import { EmptyString } from '@shared/errors/empty-string';
import { ExceedingLength } from '@shared/errors/exceeding-length';
import { ValueObject } from '@shared/value-objects/value-object';

export class NoteBody extends ValueObject<string> {
  private static MAX_LENGTH = 1000;

  protected _value: string;

  constructor(noteBody: string) {
    super();

    if (!validateStringNotEmpty(noteBody)) {
      throw new EmptyString();
    }

    if (!validateMaxStringLength(noteBody, NoteBody.MAX_LENGTH)) {
      throw new ExceedingLength(NoteBody.MAX_LENGTH);
    }

    this._value = noteBody;
  }
}
