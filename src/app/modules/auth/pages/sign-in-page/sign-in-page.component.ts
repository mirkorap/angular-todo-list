import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthStoreFacadeService } from '@auth/services/auth-store-facade.service';
import { ICredentialsDto } from '@auth/data-transfer-objects/credentials';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInPageComponent {
  constructor(private authStoreFacade: AuthStoreFacadeService) {}

  onSignIn(credentials: ICredentialsDto): void {
    this.authStoreFacade.signInWithEmailAndPassword(
      credentials.emailAddress,
      credentials.password
    );
  }

  onRegister(credentials: ICredentialsDto): void {
    this.authStoreFacade.registerWithEmailAndPassword(
      credentials.emailAddress,
      credentials.password
    );
  }

  onSignInWithGoogle(): void {
    this.authStoreFacade.signInWithGoogle();
  }
}
