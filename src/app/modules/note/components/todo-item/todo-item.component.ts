/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TodoItem } from '@note/entities/todo-item';
import { TodoName } from '@note/value-objects/todo-name';

type OnChange = (todo: TodoItem) => void;
type OnTouched = () => void;

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TodoItemComponent
    }
  ]
})
export class TodoItemComponent implements ControlValueAccessor {
  @Input() todo!: TodoItem;
  @Output() todoRemove = new EventEmitter<TodoItem>();

  nameMaxLength = TodoName.MAX_LENGTH;
  touched = false;
  disabled = false;

  onChange: OnChange = (_todo: TodoItem): void => {};
  onTouched: OnTouched = () => {};

  onDoneChange(event: MatCheckboxChange): void {
    this.markAsTouched();
    if (!this.disabled) {
      this.todo = this.todo.copyWith({ done: event.checked });
      this.onChange(this.todo);
    }
  }

  onNameInput(event: Event): void {
    this.markAsTouched();
    if (!this.disabled) {
      const name = (event.target as HTMLInputElement).value;
      this.todo = this.todo.copyWith({ name: new TodoName(name) });
      this.onChange(this.todo);
    }
  }

  writeValue(todo: TodoItem): void {
    this.todo = todo;
  }

  registerOnChange(onChange: OnChange): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: OnTouched): void {
    this.onTouched = onTouched;
  }

  markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  onRemoveClick(): void {
    this.todoRemove.emit(this.todo);
  }
}
