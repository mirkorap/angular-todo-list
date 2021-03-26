import { AuthService, AuthStoreFacadeService } from '@auth/services';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthFailure } from '@auth/failures/auth-failure';
import { Injectable } from '@angular/core';
import { User } from '@auth/entities/user';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private authStoreFacade: AuthStoreFacadeService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.getCurrentUser().pipe(
      switchMap((failureOrUser) => {
        const isSignedIn = failureOrUser instanceof User;
        this.dispatchAuthAction(failureOrUser);

        if (!isSignedIn) {
          this.router.navigateByUrl('/auth');
        }

        return of(isSignedIn);
      })
    );
  }

  private dispatchAuthAction(failureOrUser: AuthFailure | User): void {
    if (failureOrUser instanceof User) {
      return this.authStoreFacade.authorize(failureOrUser);
    }

    return this.authStoreFacade.unauthorize(failureOrUser);
  }
}
