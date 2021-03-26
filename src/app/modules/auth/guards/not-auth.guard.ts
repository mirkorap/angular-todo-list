import * as fromStore from '@auth/store';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '@auth/services';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '@auth/entities/user';
import { UserDto } from '@auth/data-transfer-objects/user';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class NotAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private store: Store<fromStore.AuthState>,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.getCurrentUser().pipe(
      switchMap((failureOrUser) => {
        const isSignedIn = failureOrUser instanceof User;

        if (isSignedIn) {
          const user = UserDto.fromDomain(failureOrUser as User).toObject();
          this.store.dispatch(fromStore.authorize({ user }));
          this.router.navigateByUrl('/notes');
        }

        return of(!isSignedIn);
      })
    );
  }
}
