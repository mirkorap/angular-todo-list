import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NoteBody } from '@note/value-objects/note-body';
import { NoteColor } from '@note/value-objects/note-color';
import { NoteForm } from '@note/forms/note.form';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteFormComponent {
  bodyMaxLength = NoteBody.MAX_LENGTH;
  colors = NoteColor.PREDEFINED_COLORS;

  constructor(public noteForm: NoteForm) {}
}
