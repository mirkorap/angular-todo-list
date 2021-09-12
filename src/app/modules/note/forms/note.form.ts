import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { INoteDto, NoteDto } from '@note/data-transfer-objects/note';
import { Note } from '@note/entities/note';
import { Subject } from 'rxjs';
import { TodoItem } from '@note/entities/todo-item';
import { TodoItemDto } from '@note/data-transfer-objects/todo-item';

export class NoteForm {
  private cancelClickSource = new Subject<void>();
  cancelClick$ = this.cancelClickSource.asObservable();

  private saveClickSource = new Subject<Note>();
  saveClick$ = this.saveClickSource.asObservable();

  constructor(private formGroup: FormGroup) {}

  get asFormGroup(): FormGroup {
    return this.formGroup;
  }

  get value(): INoteDto {
    return this.formGroup.value;
  }

  get todos(): FormArray {
    return this.formGroup.controls.todos as FormArray;
  }

  addTodo(): void {
    const todo = TodoItemDto.fromDomain(TodoItem.empty()).toObject();
    const todoCtrl = new FormControl(todo);
    this.todos.push(todoCtrl);
  }

  removeTodoAt(index: number): void {
    this.todos.removeAt(index);
  }

  cancel(): void {
    this.cancelClickSource.next();
  }

  save(): void {
    if (this.formGroup.invalid) {
      return this.formGroup.markAllAsTouched();
    }

    const note = NoteDto.fromObject(this.value).toDomain();

    this.saveClickSource.next(note);
  }
}
