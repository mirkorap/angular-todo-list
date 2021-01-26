import { CanActivate, Router } from '@angular/router';
import { AuthStoreFacadeService } from '../services/auth-store-facade.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class AuthGuard implements CanActivate {
  constructor(
    private authStoreFacade: AuthStoreFacadeService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authStoreFacade.isLoggedIn$.pipe(
      tap((isLoggedIn) => !isLoggedIn && this.router.navigateByUrl('/login'))
    );
  }
}
