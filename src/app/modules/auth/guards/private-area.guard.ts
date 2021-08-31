import { AuthService, AuthStoreFacadeService } from '@auth/services';
import { Observable, of } from 'rxjs';
import { AuthFailure } from '@auth/failures/auth-failure';
import { CanLoad } from '@angular/router';
import { Injectable } from '@angular/core';
import { RouteNavigatorService } from '@app/services';
import { User } from '@auth/entities/user';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrivateAreaGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private authStoreFacade: AuthStoreFacadeService,
    private routeNavigator: RouteNavigatorService
  ) {}

  canLoad(): Observable<boolean> {
    return this.authService.getCurrentUser().pipe(
      switchMap((failureOrUser) => {
        if (failureOrUser instanceof User) {
          return this.markAsAuthorized(failureOrUser);
        }

        return this.markAsUnauthorized(failureOrUser);
      })
    );
  }

  private markAsAuthorized(user: User): Observable<boolean> {
    this.authStoreFacade.authorize(user);

    return of(true);
  }

  private markAsUnauthorized(failure: AuthFailure): Observable<boolean> {
    this.authStoreFacade.unauthorize(failure);
    this.routeNavigator.navigateToSignIn();

    return of(false);
  }
}
