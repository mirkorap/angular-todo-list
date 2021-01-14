import { AuthRoutingModule } from './auth-routing.module';
import { FirebaseAuthService } from './services/firebase-auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';

@NgModule({
  declarations: [SignInPageComponent, SignInFormComponent],
  imports: [CommonModule, AuthRoutingModule, EffectsModule.forFeature(effects)],
  providers: [{ provide: AuthService, useClass: FirebaseAuthService }]
})
export class AuthModule {}
