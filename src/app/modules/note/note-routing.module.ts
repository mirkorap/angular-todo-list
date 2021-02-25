import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NoteOverviewPageComponent } from './pages/note-overview-page/note-overview-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NoteOverviewPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule {}
