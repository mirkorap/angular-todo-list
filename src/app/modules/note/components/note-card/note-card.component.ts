import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Note } from '@note/entities/note';
import { TodoItem } from '@note/entities/todo-item';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteCardComponent {
  @Input() note!: Note;

  @Output() noteChange = new EventEmitter<Note>();
  @Output() noteDelete = new EventEmitter<Note>();

  onTodoChange(todo: TodoItem): void {
    this.note.updateTodo(todo.copyWith({ done: !todo.done }));
    this.noteChange.emit(this.note);
  }

  onDeleteClick(): void {
    this.noteDelete.emit(this.note);
  }
}
