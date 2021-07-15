import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from '@note/entities/note';
import { NoteStoreFacadeService } from '@note/services';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';

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
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.noteStoreFacade.failureMessage$.subscribe((failureMessage) =>
      this.toastr.error(failureMessage)
    );

    this.note$ = this.selectNoteFromRoute();
  }

  onSave(note: Note): void {
    this.noteStoreFacade.upsertNote(note);
  }

  private selectNoteFromRoute(): Observable<Note> {
    return this.route.params.pipe(
      switchMap((params) => this.noteStoreFacade.selectNoteOrCreate(params.id))
    );
  }
}
