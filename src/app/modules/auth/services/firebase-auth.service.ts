import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { EmailAddress } from '../value-objects/email-address';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Password } from '../value-objects/password';
import { UniqueId } from '../../../shared/value-objects/uuid';
import { User } from '../entities/user';
import firebase from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable()
export class FirebaseAuthService implements AuthService {
  constructor(private auth: AngularFireAuth) {}

  async registerWithEmailAndPassword(
    emailAddress: EmailAddress,
    password: Password
  ): Promise<void> {
    await this.auth.createUserWithEmailAndPassword(
      emailAddress.value,
      password.value
    );
  }

  async signInWithEmailAndPassword(
    emailAddress: EmailAddress,
    password: Password
  ): Promise<void> {
    await this.auth.signInWithEmailAndPassword(
      emailAddress.value,
      password.value
    );
  }

  async signInWithGoogle(): Promise<void> {
    await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  async signOut(): Promise<void> {
    await this.auth.signOut();
  }

  getSignedInUser(): Observable<User> {
    return this.auth.user.pipe(
      map((firebaseUser) => {
        const user = new User(
          new UniqueId(firebaseUser.uid),
          new EmailAddress(firebaseUser.email),
          firebaseUser.displayName
        );

        return user;
      })
    );
  }
}
