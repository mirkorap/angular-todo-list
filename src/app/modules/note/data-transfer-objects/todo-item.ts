import { TodoItem } from '@note/entities/todo-item';
import { TodoName } from '@note/value-objects/todo-name';
import { UniqueId } from '@shared/value-objects/uuid';

export interface ITodoItemDto {
  id: string;
  name: string;
  done: boolean;
}

export class TodoItemDto implements ITodoItemDto {
  id: string;
  name: string;
  done: boolean;

  constructor(id: string, name: string, done: boolean) {
    this.id = id;
    this.name = name;
    this.done = done;
  }

  static fromDomain(todoItem: TodoItem): TodoItemDto {
    return new TodoItemDto(
      todoItem.id.value,
      todoItem.name.value,
      todoItem.done
    );
  }

  static fromObject(todoItem: ITodoItemDto): TodoItemDto {
    return new TodoItemDto(todoItem.id, todoItem.name, todoItem.done);
  }

  toDomain(): TodoItem {
    return new TodoItem(
      new UniqueId(this.id),
      new TodoName(this.name),
      this.done
    );
  }
}
