import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouteNavigatorParams, RouteNavigatorService } from '@app/services';
import { Note } from '@note/entities/note';
import { NoteStoreFacadeService } from '@note/services';

@Component({
  selector: 'app-note-overview-page',
  templateUrl: './note-overview-page.component.html',
  styleUrls: ['./note-overview-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteOverviewPageComponent {
  uncompletedFilter = false;

  constructor(
    public noteStoreFacade: NoteStoreFacadeService,
    private routeNavigator: RouteNavigatorService
  ) {}

  canShowNote(note: Note): boolean {
    if (!this.uncompletedFilter) {
      return true;
    }

    return note.isUncompleted();
  }

  navigateToEditNote(note: Note): void {
    const options: RouteNavigatorParams<{ id: string }> = {
      params: { id: note.id.value }
    };

    this.routeNavigator.navigateToEditNote(options);
  }

  updateNote(note: Note): void {
    this.noteStoreFacade.updateNote(note);
  }

  deleteNote(note: Note): void {
    const confirmed = confirm('Are you sure you want to delete this note?');
    confirmed && this.noteStoreFacade.deleteNote(note);
  }

  navigateToNewNote(): void {
    this.routeNavigator.navigateToNewNote();
  }
}
