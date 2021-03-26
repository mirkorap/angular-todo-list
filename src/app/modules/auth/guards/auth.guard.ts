import * as fromStore from '@auth/store';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthFailure } from '@auth/failures/auth-failure';
import { AuthService } from '@auth/services';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '@auth/entities/user';
import { UserDto } from '@auth/data-transfer-objects/user';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private store: Store<fromStore.AuthState>,
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
      const user = UserDto.fromDomain(failureOrUser).toObject();
      return this.store.dispatch(fromStore.authorize({ user }));
    }

    return this.store.dispatch(
      fromStore.unauthorize({ failure: failureOrUser })
    );
  }
}
