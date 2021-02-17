import { CanActivate, Router } from '@angular/router';
import { AuthStoreFacadeService } from '@auth/services/auth-store-facade.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class AuthGuard implements CanActivate {
  constructor(
    private authStoreFacade: AuthStoreFacadeService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authStoreFacade.isSignedIn$.pipe(
      tap((isSignedIn) => !isSignedIn && this.router.navigateByUrl('/auth'))
    );
  }
}
