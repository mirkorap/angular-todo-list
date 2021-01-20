import * as fromServices from './services';
import { AuthEffects, authFeatureKey, authReducer } from './store';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [SignInPageComponent, SignInFormComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    StoreModule.forFeature(authFeatureKey, authReducer),
    EffectsModule.forFeature([AuthEffects])
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
