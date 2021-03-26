import { AuthService, AuthStoreFacadeService } from '@auth/services';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '@auth/entities/user';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class NotAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private authStoreFacade: AuthStoreFacadeService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.getCurrentUser().pipe(
      switchMap((failureOrUser) => {
        const isSignedIn = failureOrUser instanceof User;

        if (isSignedIn) {
          this.authStoreFacade.authorize(failureOrUser as User);
          this.router.navigateByUrl('/notes');
        }

        return of(!isSignedIn);
      })
    );
  }
}
