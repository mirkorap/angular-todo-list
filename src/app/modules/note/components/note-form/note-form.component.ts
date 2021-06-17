import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Note } from '@note/entities/note';
import { NoteBody } from '@note/value-objects/note-body';
import { NoteColor } from '@note/value-objects/note-color';
import { TodoItem } from '@note/entities/todo-item';

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

  get todosCtrl(): FormArray {
    return this.noteForm.controls.todos as FormArray;
  }

  findTodoCtrlElementAt(index: number): FormControl {
    return this.todosCtrl.controls[index] as FormControl;
  }

  onTodoAdd(): void {
    const todoCtrl = this.fb.control(TodoItem.empty());
    this.todosCtrl.push(todoCtrl);
  }

  onTodoRemove(index: number): void {
    this.todosCtrl.removeAt(index);
  }

  private initNoteForm(): void {
    this.noteForm = this.fb.group({
      body: this.fb.control(this.note.body.value, [
        Validators.required,
        Validators.maxLength(NoteBody.MAX_LENGTH)
      ]),
      color: this.fb.control(this.note.color.value, Validators.required),
      todos: this.fb.array(this.createTodoCtrls(), [
        Validators.maxLength(Note.MAX_TODOS_NUMBER)
      ])
    });
  }

  private createTodoCtrls(): FormControl[] {
    return this.note.todos.value.map((item) => this.fb.control(item));
  }
}
