import * as fromPages from './pages';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NoteExistsGuard } from './guards/note-exists.guard';

const routes: Routes = [
  {
    path: 'new',
    component: fromPages.NoteFormPageComponent
  },
  {
    path: ':id',
    canActivate: [NoteExistsGuard],
    component: fromPages.NoteFormPageComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: fromPages.NoteOverviewPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule {}
