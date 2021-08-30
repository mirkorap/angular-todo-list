import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Note } from '@note/entities/note';
import { NoteStoreFacadeService } from '@note/services';
import { Observable } from 'rxjs';
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
    private route: ActivatedRoute,
    private router: Router
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
    this.router.navigateByUrl('/notes');
  }

  private selectNoteFromRoute(): Observable<Note> {
    return this.route.params.pipe(
      switchMap((params) => this.noteStoreFacade.selectNoteOrCreate(params.id))
    );
  }
}
