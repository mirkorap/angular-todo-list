import * as fromAuthGuards from '@auth/guards';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@auth/auth.module').then((m) => m.AuthModule),
    canActivate: [fromAuthGuards.NotAuthGuard]
  },
  {
    path: 'notes',
    loadChildren: () => import('@note/note.module').then((m) => m.NoteModule),
    canLoad: [fromAuthGuards.AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/notes'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
