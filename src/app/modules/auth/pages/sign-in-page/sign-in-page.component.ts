import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthStoreFacadeService } from '@auth/services';
import { ICredentialsDto } from '@auth/data-transfer-objects/credentials';
import { RouteNavigatorService } from '@app/services';

@UntilDestroy()
@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInPageComponent implements OnInit {
  constructor(
    public authStoreFacade: AuthStoreFacadeService,
    private routeNavigator: RouteNavigatorService
  ) {}

  ngOnInit(): void {
    this.authStoreFacade.isSignedIn$
      .pipe(untilDestroyed(this))
      .subscribe((isSignedIn) => {
        return isSignedIn && this.routeNavigator.navigateToNoteOverview();
      });
  }

  signInWithEmailAndPassword(credentials: ICredentialsDto): void {
    this.authStoreFacade.signInWithEmailAndPassword(credentials);
  }

  registerWithEmailAndPassword(credentials: ICredentialsDto): void {
    this.authStoreFacade.registerWithEmailAndPassword(credentials);
  }

  signInWithGoogle(): void {
    this.authStoreFacade.signInWithGoogle();
  }
}
