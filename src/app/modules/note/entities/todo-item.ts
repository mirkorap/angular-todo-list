import { Entity } from '@shared/entities/entity';
import { TodoName } from '@note/value-objects/todo-name';
import { UniqueId } from '@shared/value-objects/uuid';

export class TodoItem extends Entity {
  id: UniqueId;
  name: TodoName;
  done: boolean;

  constructor(id: UniqueId, name: TodoName, done: boolean) {
    super();
    this.id = id;
    this.name = name;
    this.done = done;
  }

  isCompleted(): boolean {
    return this.done;
  }

  isUncompleted(): boolean {
    return !this.isCompleted();
  }
}
