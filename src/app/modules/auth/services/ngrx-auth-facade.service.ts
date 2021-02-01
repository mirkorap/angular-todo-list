import * as fromStore from '@auth/store';
import { AuthFailure } from '@auth/failures/auth-failure';
import { AuthStoreFacadeService } from './auth-store-facade.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '@auth/entities/user';
import { UserDto } from '@auth/data-transfer-objects/user';
import { map } from 'rxjs/operators';

@Injectable()
export class NgrxAuthFacadeService implements AuthStoreFacadeService {
  user$: Observable<User | Record<string, never>> = this.store
    .select(fromStore.selectUser)
    .pipe(
      map((user) =>
        UserDto.isValid(user) ? UserDto.fromObject(user).toDomain() : {}
      )
    );

  failure$: Observable<AuthFailure | null> = this.store.select(
    fromStore.selectFailure
  );

  isSubmitting$: Observable<boolean> = this.store.select(
    fromStore.isSubmitting
  );

  isSignedIn$: Observable<boolean> = this.store.select(fromStore.isSignedIn);

  showErrorMessage$: Observable<boolean> = this.store.select(
    fromStore.showErrorMessage
  );

  constructor(private store: Store<fromStore.AuthState>) {}

  registerWithEmailAndPassword(emailAddress: string, password: string): void {
    this.store.dispatch(
      fromStore.registerWithEmailAndPassword({ emailAddress, password })
    );
  }

  signInWithEmailAndPassword(emailAddress: string, password: string): void {
    this.store.dispatch(
      fromStore.signInWithEmailAndPassword({ emailAddress, password })
    );
  }

  signInWithGoogle(): void {
    this.store.dispatch(fromStore.signInWithGoogle());
  }

  signOut(): void {
    this.store.dispatch(fromStore.signOut());
  }
}
