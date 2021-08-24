import * as fromPages from './pages';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NoteExistsGuard } from './guards/note-exists.guard';
import { NoteStateResolver } from './resolvers/note-state.resolver';

const routes: Routes = [
  {
    path: 'new',
    resolve: { state: NoteStateResolver },
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
    resolve: { state: NoteStateResolver },
    component: fromPages.NoteOverviewPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule {}
