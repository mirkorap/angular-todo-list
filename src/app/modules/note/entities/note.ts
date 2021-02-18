import { LimitedList } from '@shared/value-objects/limited-list';
import { NoteBody } from '@note/value-objects/note-body';
import { NoteColor } from '@note/value-objects/note-color';
import { TodoItem } from './todo-item';

export class Note {
  body: NoteBody;
  color: NoteColor;
  todos: LimitedList<TodoItem>;

  constructor(body: NoteBody, color: NoteColor, todos: LimitedList<TodoItem>) {
    this.body = body;
    this.color = color;
    this.todos = todos;
  }
}
