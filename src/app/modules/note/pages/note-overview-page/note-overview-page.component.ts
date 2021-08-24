import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Note } from '@note/entities/note';
import { NoteStoreFacadeService } from '@note/services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@UntilDestroy()
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
    private router: Router,
    private toastr: ToastrService
  ) {}

  // TODO: create global store to manage failure / info message
  ngOnInit(): void {
    this.noteStoreFacade.failureMessage$
      .pipe(untilDestroyed(this))
      .subscribe((failureMessage) => this.toastr.error(failureMessage));
  }

  canShowNote(note: Note): boolean {
    if (!this.uncompletedFilter) {
      return true;
    }

    return note.isUncompleted();
  }

  navigateToEditNotePage(note: Note): void {
    this.router.navigateByUrl(`/notes/${note.id.value}`);
  }

  updateNote(note: Note): void {
    this.noteStoreFacade.updateNote(note);
  }

  deleteNote(note: Note): void {
    const confirmed = confirm('Are you sure you want to delete this note?');
    confirmed && this.noteStoreFacade.deleteNote(note);
  }

  navigateToNewNotePage(): void {
    this.router.navigateByUrl('/notes/new');
  }
}
