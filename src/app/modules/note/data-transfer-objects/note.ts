import { ITodoItemDto, TodoItemDto } from './todo-item';
import { LimitedList } from '@shared/value-objects/limited-list';
import { Note } from '@note/entities/note';
import { NoteBody } from '@note/value-objects/note-body';
import { NoteColor } from '@note/value-objects/note-color';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { UniqueId } from '@shared/value-objects/uuid';

export interface INoteDto {
  id: string;
  body: string;
  color: string;
  todos: ITodoItemDto[];
}

export class NoteDto implements INoteDto {
  id: string;
  body: string;
  color: string;
  todos: ITodoItemDto[];

  constructor(id: string, body: string, color: string, todos: ITodoItemDto[]) {
    this.id = id;
    this.body = body;
    this.color = color;
    this.todos = todos;
  }

  static fromDomain(note: Note): NoteDto {
    return new NoteDto(
      note.id.value,
      note.body.value,
      note.color.value,
      note.todos.value.map((todo) => TodoItemDto.fromDomain(todo))
    );
  }

  static fromObject(note: INoteDto): NoteDto {
    return new NoteDto(note.id, note.body, note.color, note.todos);
  }

  static fromFirebase(
    doc: QueryDocumentSnapshot<Omit<INoteDto, 'id'>>
  ): NoteDto {
    return new NoteDto(
      doc.id,
      doc.data().body,
      doc.data().color,
      doc.data().todos
    );
  }

  toObject(): INoteDto {
    return JSON.parse(JSON.stringify(this));
  }

  toDomain(): Note {
    return new Note(
      new UniqueId(this.id),
      new NoteBody(this.body),
      new NoteColor(this.color),
      new LimitedList(
        this.todos.map((todo) => TodoItemDto.fromObject(todo).toDomain()),
        Note.MAX_TODOS_NUMBER
      )
    );
  }
}
