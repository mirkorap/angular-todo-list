import * as fromGuards from './guards';
import * as fromServices from './services';
import { AuthEffects, authFeatureKey, authReducer } from './store';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AuthRoutingModule } from './auth-routing.module';
import { EffectsModule } from '@ngrx/effects';
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
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [fromGuards.AuthGuard, fromGuards.NotAuthGuard]
    };
  }
}
