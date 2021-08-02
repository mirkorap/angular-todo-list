import { AuthService, AuthStoreFacadeService } from '@auth/services';
import { CanLoad, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthFailure } from '@auth/failures/auth-failure';
import { Injectable } from '@angular/core';
import { User } from '@auth/entities/user';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrivateAreaGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private authStoreFacade: AuthStoreFacadeService,
    private router: Router
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
    this.router.navigateByUrl('/auth');

    return of(false);
  }
}
