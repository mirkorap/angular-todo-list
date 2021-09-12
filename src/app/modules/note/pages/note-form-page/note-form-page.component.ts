import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from '@note/entities/note';
import { NoteForm } from '@note/forms/note.form';
import { NoteFormFactory } from '@note/factories/note-form.factory';
import { NoteStoreFacadeService } from '@note/services';
import { RouteNavigatorService } from '@app/services';
import { Subscription } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';
import { switchMap } from 'rxjs/operators';

@UntilDestroy({ arrayName: 'subscriptions' })
@Component({
  selector: 'app-note-form-page',
  templateUrl: './note-form-page.component.html',
  styleUrls: ['./note-form-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    NoteFormFactory,
    {
      provide: NoteForm,
      useFactory: (factory: NoteFormFactory, route: ActivatedRoute) => {
        const note: Note = route.snapshot.data.note;
        return factory.create(note);
      },
      deps: [NoteFormFactory, ActivatedRoute]
    }
  ]
})
export class NoteFormPageComponent implements OnInit {
  private subscriptions = new Subscription();

  constructor(
    private noteForm: NoteForm,
    private noteStoreFacade: NoteStoreFacadeService,
    private routeNavigator: RouteNavigatorService
  ) {}

  ngOnInit(): void {
    this.upsertNote();
    this.navigateToNoteOverview();
  }

  upsertNote(): void {
    const sub = this.noteForm.saveClick$
      .pipe(switchMap((note) => this.noteStoreFacade.upsertNote(note)))
      .subscribe();

    this.subscriptions.add(sub);
  }

  navigateToNoteOverview(): void {
    const sub = this.noteForm.cancelClick$.subscribe(() => {
      this.routeNavigator.navigateToNoteOverview();
    });

    this.subscriptions.add(sub);
  }
}
