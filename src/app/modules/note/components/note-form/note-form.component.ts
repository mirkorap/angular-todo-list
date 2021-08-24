import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { LimitedList } from '@shared/value-objects/limited-list';
import { Note } from '@note/entities/note';
import { NoteBody } from '@note/value-objects/note-body';
import { NoteColor } from '@note/value-objects/note-color';
import { TodoItem } from '@note/entities/todo-item';
import { UniqueId } from '@shared/value-objects/uuid';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteFormComponent implements OnInit {
  @Input() note!: Note;

  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<Note>();

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

  findTodoCtrlAt(index: number): FormControl {
    return this.todosCtrl.controls[index] as FormControl;
  }

  addTodoCtrl(): void {
    const todoCtrl = this.fb.control(TodoItem.empty());
    this.todosCtrl.push(todoCtrl);
  }

  removeTodoCtrlAt(index: number): void {
    this.todosCtrl.removeAt(index);
  }

  emitCancelEvent(): void {
    this.cancel.emit();
  }

  submit(): void {
    if (this.noteForm.invalid) {
      return this.noteForm.markAllAsTouched();
    }

    const note = this.note.copyWith({
      id: new UniqueId(this.noteForm.value.id),
      body: new NoteBody(this.noteForm.value.body),
      color: new NoteColor(this.noteForm.value.color),
      todos: new LimitedList(this.noteForm.value.todos, Note.MAX_TODOS_NUMBER)
    });

    this.save.emit(note);
  }

  private initNoteForm(): void {
    this.noteForm = this.fb.group({
      id: this.fb.control(this.note.id.value),
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
