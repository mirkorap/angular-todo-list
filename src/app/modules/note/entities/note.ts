import { Entity } from '@shared/entities/entity';
import { LimitedList } from '@shared/value-objects/limited-list';
import { NoteBody } from '@note/value-objects/note-body';
import { NoteColor } from '@note/value-objects/note-color';
import { TodoItem } from './todo-item';
import { UniqueId } from '@shared/value-objects/uuid';

export class Note extends Entity {
  static MAX_TODOS_NUMBER = 3;

  id: UniqueId;
  body: NoteBody;
  color: NoteColor;
  todos: LimitedList<TodoItem>;

  constructor(
    id: UniqueId,
    body: NoteBody,
    color: NoteColor,
    todos: LimitedList<TodoItem>
  ) {
    super();
    this.id = id;
    this.body = body;
    this.color = color;
    this.todos = todos;
  }

  isCompleted(): boolean {
    return this.todos.value.every((todo) => todo.isCompleted());
  }

  isUncompleted(): boolean {
    return !this.isCompleted();
  }
}
