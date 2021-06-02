import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { TodoItem } from '@note/entities/todo-item';
import { TodoName } from '@note/value-objects/todo-name';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {
  @Input() todo!: TodoItem;
  @Output() todoRemove = new EventEmitter<TodoItem>();
  @Output() todoAdd = new EventEmitter<void>();

  nameMaxLength = TodoName.MAX_LENGTH;

  onRemoveClick(): void {
    this.todoRemove.emit(this.todo);
  }

  onAddClick(): void {
    this.todoAdd.emit();
  }
}
