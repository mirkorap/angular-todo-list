import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth/guards/auth.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => {
      return import('./modules/auth/auth.module').then((m) => m.AuthModule);
    }
  },
  {
    path: 'notes',
    loadChildren: () => {
      return import('./modules/note/note.module').then((m) => m.NoteModule);
    },
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
