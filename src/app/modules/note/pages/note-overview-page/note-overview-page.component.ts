import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-note-overview-page',
  templateUrl: './note-overview-page.component.html',
  styleUrls: ['./note-overview-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteOverviewPageComponent {}
