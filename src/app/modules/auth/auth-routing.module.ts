import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: SignInPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
