import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthStoreFacadeService } from '@auth/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(public authStoreFacade: AuthStoreFacadeService) {}

  signOut(): void {
    this.authStoreFacade.signOut();
  }
}
