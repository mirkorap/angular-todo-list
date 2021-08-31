import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivatedRoute } from '@angular/router';
import { Note } from '@note/entities/note';
import { NoteStoreFacadeService } from '@note/services';
import { Observable } from 'rxjs';
import { RouteNavigatorService } from '@app/services';
import { switchMap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-note-form-page',
  templateUrl: './note-form-page.component.html',
  styleUrls: ['./note-form-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteFormPageComponent implements OnInit {
  note$!: Observable<Note>;

  constructor(
    private noteStoreFacade: NoteStoreFacadeService,
    private routeNavigator: RouteNavigatorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.note$ = this.selectNoteFromRoute();
  }

  upsertNote(note: Note): void {
    this.noteStoreFacade
      .upsertNote(note)
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  navigateToNoteOverviewPage(): void {
    this.routeNavigator.navigateToNoteOverview();
  }

  private selectNoteFromRoute(): Observable<Note> {
    return this.route.params.pipe(
      switchMap((params) => this.noteStoreFacade.selectNoteOrCreate(params.id))
    );
  }
}
