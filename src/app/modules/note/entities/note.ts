import { LimitedList } from '@shared/value-objects/limited-list';
import { NoteBody } from '@note/value-objects/note-body';
import { NoteColor } from '@note/value-objects/note-color';
import { TodoItem } from './todo-item';
import { UniqueId } from '@shared/value-objects/uuid';

export class Note {
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
    this.id = id;
    this.body = body;
    this.color = color;
    this.todos = todos;
  }
}
