import { InvalidChoice } from '@shared/errors/invalid-choice';
import { ValueObject } from '@shared/value-objects/value-object';
import { validateChoice } from '@shared/validators/value-validators';

export class NoteColor extends ValueObject<string> {
  public static PREDEFINED_COLORS = [
    '#FAFAFA', // canvas
    '#FA8072', // salmon
    '#FEDC56', // mustard
    '#D0F0C0', // tea
    '#FCA3B7', // flamingo
    '#997950', // tortilla
    '#FFFDD0' // cream
  ];

  public static DEFAULT_COLOR = NoteColor.PREDEFINED_COLORS[0];

  protected _value: string;

  constructor(noteColor: string) {
    super();

    if (!validateChoice(noteColor, NoteColor.PREDEFINED_COLORS)) {
      throw new InvalidChoice(NoteColor.PREDEFINED_COLORS);
    }

    this._value = noteColor;
  }
}
