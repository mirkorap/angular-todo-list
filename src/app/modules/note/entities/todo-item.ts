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

  static empty(): TodoItem {
    return new TodoItem(
      UniqueId.generate(),
      new TodoName('Put your description here...'),
      false
    );
  }

  isCompleted(): boolean {
    return this.done;
  }

  equalsTo(objectToCompare: this): boolean {
    return this.id.equalsTo(objectToCompare.id);
  }
}
