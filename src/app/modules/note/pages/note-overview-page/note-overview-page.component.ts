import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from '@shared/decorators/auto-unsubscribe';
import { Note } from '@note/entities/note';
import { NoteStoreFacadeService } from '@note/services/note-store-facade.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@AutoUnsubscribe()
@Component({
  selector: 'app-note-overview-page',
  templateUrl: './note-overview-page.component.html',
  styleUrls: ['./note-overview-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteOverviewPageComponent implements OnInit {
  uncompletedFilter = false;

  constructor(
    public noteStoreFacade: NoteStoreFacadeService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  // TODO: move these logic to facade? See RxJS blog posts
  ngOnInit(): void {
    this.noteStoreFacade.failureMessage$.subscribe((failureMessage) =>
      this.toastr.error(failureMessage)
    );

    this.noteStoreFacade.loadAllNotes();
  }

  canShowNote(note: Note): boolean {
    if (!this.uncompletedFilter) {
      return true;
    }

    return note.isUncompleted();
  }

  onNoteClick(note: Note): void {
    this.router.navigateByUrl(`/notes/${note.id.value}`);
  }

  onNoteChange(note: Note): void {
    this.noteStoreFacade.updateNote(note);
  }

  onNoteDelete(note: Note): void {
    const confirmed = confirm('Are you sure you want to delete this note?');
    confirmed && this.noteStoreFacade.deleteNote(note);
  }

  onAddClick(): void {
    this.router.navigateByUrl('/notes/new');
  }
}
