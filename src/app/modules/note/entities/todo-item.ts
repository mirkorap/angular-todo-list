import { TodoName } from '@note/value-objects/todo-name';
import { UniqueId } from '@shared/value-objects/uuid';

export class TodoItem {
  id: UniqueId;
  name: TodoName;
  done: boolean;

  constructor(id: UniqueId, name: TodoName, done: boolean) {
    this.id = id;
    this.name = name;
    this.done = done;
  }
}
