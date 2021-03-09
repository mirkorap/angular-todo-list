import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthStoreFacadeService } from '@auth/services/auth-store-facade.service';
import { AutoUnsubscribe } from '@shared/decorators/auto-unsubscribe';
import { ICredentialsDto } from '@auth/data-transfer-objects/credentials';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@AutoUnsubscribe()
export class SignInPageComponent implements OnInit {
  constructor(
    public authStoreFacade: AuthStoreFacadeService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  // TODO: move these logic to facade? See RxJS blog posts
  ngOnInit(): void {
    this.authStoreFacade.failureMessage$.subscribe(
      (message) => message && this.toastr.error(message)
    );

    this.authStoreFacade.isSignedIn$.subscribe(
      (isSignedIn) => isSignedIn && this.router.navigateByUrl('/notes')
    );
  }

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
