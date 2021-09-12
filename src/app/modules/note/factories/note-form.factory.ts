import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Injectable } from '@angular/core';
import { Note } from '@note/entities/note';
import { NoteBody } from '@note/value-objects/note-body';
import { NoteForm } from '@note/forms/note.form';
import { TodoItemDto } from '@note/data-transfer-objects/todo-item';

@Injectable()
export class NoteFormFactory {
  constructor(private fb: FormBuilder) {}

  create(note: Note): NoteForm {
    const formGroup = this.createFormGroup(note);
    return new NoteForm(formGroup);
  }

  private createFormGroup(note: Note): FormGroup {
    return this.fb.group({
      id: this.fb.control(note.id.value),
      body: this.fb.control(note.body.value, [
        Validators.required,
        Validators.maxLength(NoteBody.MAX_LENGTH)
      ]),
      color: this.fb.control(note.color.value, Validators.required),
      todos: this.fb.array(this.createTodoCtrls(note), [
        Validators.maxLength(Note.MAX_TODOS_NUMBER)
      ])
    });
  }

  private createTodoCtrls(note: Note): FormControl[] {
    return note.todos.value.map((item) => {
      const todo = TodoItemDto.fromDomain(item).toObject();
      return this.fb.control(todo);
    });
  }
}
