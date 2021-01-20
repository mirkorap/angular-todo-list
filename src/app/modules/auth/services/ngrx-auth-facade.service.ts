import * as fromStore from '../store';
import { AuthStoreFacadeService } from './auth-store-facade.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../entities/user';
import { UserDto } from './../data-transfer-objects/user';
import { map } from 'rxjs/operators';

@Injectable()
export class NgrxAuthFacadeService implements AuthStoreFacadeService {
  user$: Observable<User> = this.store
    .select(fromStore.selectUser)
    .pipe(map((user) => UserDto.fromObject(user).toDomain()));

  isSubmitting$: Observable<boolean> = this.store.select(
    fromStore.isSubmitting
  );

  isLoggedIn$: Observable<boolean> = this.store.select(fromStore.isLoggedIn);

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
}
