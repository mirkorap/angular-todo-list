import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Note } from '@note/entities/note';
import { NoteStoreFacadeService } from '@note/services/note-store-facade.service';

@Component({
  selector: 'app-note-overview-page',
  templateUrl: './note-overview-page.component.html',
  styleUrls: ['./note-overview-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteOverviewPageComponent implements OnInit {
  constructor(public noteStoreFacade: NoteStoreFacadeService) {}

  ngOnInit(): void {
    this.noteStoreFacade.loadAllNotes();
  }

  onUncompletedFilterChange(checked: boolean): void {
    if (checked) {
      return this.noteStoreFacade.loadUncompletedNotes();
    }

    return this.noteStoreFacade.loadAllNotes();
  }

  onNoteChange(note: Note): void {
    this.noteStoreFacade.updateNote(note);
  }

  onNoteDelete(note: Note): void {
    this.noteStoreFacade.deleteNote(note);
  }
}
