import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthStoreFacadeService } from '@auth/services';
import { AutoUnsubscribe } from '@shared/decorators/auto-unsubscribe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@AutoUnsubscribe()
export class AppComponent {
  constructor(public authStoreFacade: AuthStoreFacadeService) {}

  signOut(): void {
    this.authStoreFacade.signOut();
  }
}
