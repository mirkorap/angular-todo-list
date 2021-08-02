import { AuthService, AuthStoreFacadeService } from '@auth/services';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '@auth/entities/user';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicAreaGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private authStoreFacade: AuthStoreFacadeService,
    private router: Router
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
    this.router.navigateByUrl('/notes');

    return of(false);
  }
}
