import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthStoreFacadeService } from '@auth/services';
import { RouteNavigatorService } from '@app/services';
import { SignInForm } from '@auth/forms/sign-in.form';
import { SignInFormFactory } from '@auth/factories/sign-in-form.factory';
import { Subscription } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';
import { filter } from 'rxjs/operators';

@UntilDestroy({ arrayName: 'subscriptions' })
@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SignInFormFactory,
    {
      provide: SignInForm,
      useFactory: (factory: SignInFormFactory) => factory.create(),
      deps: [SignInFormFactory]
    }
  ]
})
export class SignInPageComponent implements OnInit {
  private subscriptions = new Subscription();

  constructor(
    public authStoreFacade: AuthStoreFacadeService,
    private signInForm: SignInForm,
    private routeNavigator: RouteNavigatorService
  ) {}

  ngOnInit(): void {
    this.redirectSignedInUser();
    this.signInWithEmailAndPassword();
    this.registerWithEmailAndPassword();
    this.signInWithGoogle();
  }

  redirectSignedInUser(): void {
    const sub = this.authStoreFacade.isSignedIn$
      .pipe(filter((isSignedIn) => isSignedIn))
      .subscribe(() => this.routeNavigator.navigateToNoteOverview());

    this.subscriptions.add(sub);
  }

  signInWithEmailAndPassword(): void {
    const sub = this.signInForm.signInClick$.subscribe((credentials) => {
      this.authStoreFacade.signInWithEmailAndPassword(credentials);
    });

    this.subscriptions.add(sub);
  }

  registerWithEmailAndPassword(): void {
    const sub = this.signInForm.registerClick$.subscribe((credentials) => {
      this.authStoreFacade.registerWithEmailAndPassword(credentials);
    });

    this.subscriptions.add(sub);
  }

  signInWithGoogle(): void {
    const sub = this.signInForm.signInWithGoogleClick$.subscribe(() => {
      this.authStoreFacade.signInWithGoogle();
    });

    this.subscriptions.add(sub);
  }
}
