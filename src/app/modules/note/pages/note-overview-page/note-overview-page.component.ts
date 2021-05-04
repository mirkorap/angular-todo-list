import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Note } from '@note/entities/note';
import { NoteStoreFacadeService } from '@note/services/note-store-facade.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-note-overview-page',
  templateUrl: './note-overview-page.component.html',
  styleUrls: ['./note-overview-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteOverviewPageComponent implements OnInit {
  constructor(
    public noteStoreFacade: NoteStoreFacadeService,
    private toastr: ToastrService
  ) {}

  // TODO: move these logic to facade? See RxJS blog posts
  ngOnInit(): void {
    this.noteStoreFacade.loadAllNotes();

    this.noteStoreFacade.failureMessage$.subscribe((failureMessage) =>
      this.toastr.error(failureMessage)
    );
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
    const confirmed = confirm('Are you sure you want to delete this note?');

    if (confirmed) {
      this.noteStoreFacade.deleteNote(note);
    }
  }
}
