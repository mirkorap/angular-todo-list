import * as fromServices from './services';
import { AuthEffects, authFeatureKey, authReducer } from './store';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '@app/material.module';
import { NgModule } from '@angular/core';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { StoreModule } from '@ngrx/store';
import { environment } from '@environments/environment';

@NgModule({
  declarations: [SignInPageComponent, SignInFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AuthRoutingModule,
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(authFeatureKey, authReducer),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [
    {
      provide: fromServices.AuthService,
      useClass: fromServices.FirebaseAuthService
    },
    {
      provide: fromServices.AuthStoreFacadeService,
      useClass: fromServices.NgrxAuthFacadeService
    }
  ]
})
export class AuthModule {}
