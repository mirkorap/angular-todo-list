import * as fromPages from './pages';
import * as fromResolvers from './resolvers';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NoteExistsGuard } from './guards/note-exists.guard';

const routes: Routes = [
  {
    path: 'new',
    resolve: { note: fromResolvers.NoteFormResolver },
    component: fromPages.NoteFormPageComponent
  },
  {
    path: ':id',
    canActivate: [NoteExistsGuard],
    resolve: { note: fromResolvers.NoteFormResolver },
    component: fromPages.NoteFormPageComponent
  },
  {
    path: '',
    pathMatch: 'full',
    resolve: { state: fromResolvers.NoteStateResolver },
    component: fromPages.NoteOverviewPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule {}
