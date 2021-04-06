import { InvalidChoice } from '@shared/errors/invalid-choice';
import { ValueObject } from '@shared/value-objects/value-object';
import { validateChoice } from '@shared/validators/value-validators';

export class NoteColor extends ValueObject<string> {
  private static predefinedColors = [
    '#FAFAFA', // canvas
    '#FA8072', // salmon
    '#FEDC56', // mustard
    '#D0F0C0', // tea
    '#FCA3B7', // flamingo
    '#997950', // tortilla
    '#FFFDD0' // cream
  ];

  protected _value: string;

  constructor(noteColor: string) {
    super();

    if (!validateChoice(noteColor, NoteColor.predefinedColors)) {
      throw new InvalidChoice(NoteColor.predefinedColors);
    }

    this._value = noteColor;
  }
}
