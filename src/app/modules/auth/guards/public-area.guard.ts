import { AuthService, AuthStoreFacadeService } from '@auth/services';
import { Observable, of } from 'rxjs';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { RouteNavigatorService } from '@app/services';
import { User } from '@auth/entities/user';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicAreaGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private authStoreFacade: AuthStoreFacadeService,
    private routeNavigator: RouteNavigatorService
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.getCurrentUser().pipe(
      switchMap((failureOrUser) => {
        if (failureOrUser instanceof User) {
          return this.markAsAuthorized(failureOrUser);
        }

        return of(true);
      })
    );
  }

  private markAsAuthorized(user: User): Observable<boolean> {
    this.authStoreFacade.authorize(user);
    this.routeNavigator.navigateToNoteOverview();

    return of(false);
  }
}
