import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '@note/entities/note';
import { NoteBody } from '@note/value-objects/note-body';
import { NoteColor } from '@note/value-objects/note-color';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteFormComponent implements OnInit {
  @Input() note!: Note;

  bodyMaxLength = NoteBody.MAX_LENGTH;
  colors = NoteColor.PREDEFINED_COLORS;
  noteForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initNoteForm();
  }

  private initNoteForm(): void {
    this.noteForm = this.fb.group({
      body: this.fb.control(this.note.body.value, [
        Validators.required,
        Validators.maxLength(NoteBody.MAX_LENGTH)
      ]),
      color: this.fb.control(this.note.color.value, Validators.required)
    });
  }
}
