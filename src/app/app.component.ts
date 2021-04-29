import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthStoreFacadeService } from '@auth/services';
import { AutoUnsubscribe } from '@shared/decorators/auto-unsubscribe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@AutoUnsubscribe()
export class AppComponent implements OnInit {
  constructor(
    public authStoreFacade: AuthStoreFacadeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authStoreFacade.isSignedIn$.subscribe(
      (isSignedIn) => !isSignedIn && this.router.navigateByUrl('/auth')
    );
  }

  signOut(): void {
    this.authStoreFacade.signOut();
  }
}
