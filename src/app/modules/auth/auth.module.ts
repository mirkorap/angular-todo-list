import { AuthRoutingModule } from './auth-routing.module';
import { FirebaseAuthService } from './services/firebase-auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { effects, authFeatureKey, authReducer } from './store';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [SignInPageComponent, SignInFormComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    StoreModule.forFeature(authFeatureKey, authReducer),
    EffectsModule.forFeature(effects)
  ],
  providers: [{ provide: AuthService, useClass: FirebaseAuthService }]
})
export class AuthModule {}
