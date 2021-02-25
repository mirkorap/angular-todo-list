import * as fromServices from './services';
import { AuthEffects, authFeatureKey, authReducer } from './store';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AuthGuard } from './guards/auth.guard';
import { AuthRoutingModule } from './auth-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { StoreModule } from '@ngrx/store';
import { environment } from '@environments/environment';

@NgModule({
  declarations: [SignInPageComponent, SignInFormComponent],
  imports: [
    SharedModule,
    AuthRoutingModule,
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(authFeatureKey, authReducer),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [
    AuthGuard,
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
