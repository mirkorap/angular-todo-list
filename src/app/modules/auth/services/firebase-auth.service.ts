import { AngularFireAuth } from '@angular/fire/auth';
import { AuthFailure } from '@auth/failures/auth-failure';
import { AuthService } from './auth.service';
import { EmailAddress } from '@auth/value-objects/email-address';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Password } from '@auth/value-objects/password';
import { UniqueId } from '@shared/value-objects/uuid';
import { User } from '@auth/entities/user';
import firebase from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable()
export class FirebaseAuthService implements AuthService {
  constructor(private auth: AngularFireAuth) {}

  async registerWithEmailAndPassword(
    emailAddress: EmailAddress,
    password: Password
  ): Promise<AuthFailure | void> {
    try {
      await this.auth.createUserWithEmailAndPassword(
        emailAddress.value,
        password.value
      );
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        return AuthFailure.EMAIL_ALREADY_IN_USE;
      }

      return AuthFailure.SERVER_ERROR;
    }
  }

  async signInWithEmailAndPassword(
    emailAddress: EmailAddress,
    password: Password
  ): Promise<AuthFailure | void> {
    try {
      await this.auth.signInWithEmailAndPassword(
        emailAddress.value,
        password.value
      );
    } catch (error) {
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        return AuthFailure.INVALID_EMAIL_AND_PASSWORD;
      }

      return AuthFailure.SERVER_ERROR;
    }
  }

  async signInWithGoogle(): Promise<AuthFailure | void> {
    try {
      const googleUser = await this.auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );

      if (!googleUser.user) {
        return AuthFailure.CANCELLED_BY_USER;
      }
    } catch (e) {
      return AuthFailure.SERVER_ERROR;
    }
  }

  async signOut(): Promise<void> {
    await this.auth.signOut();
  }

  getSignedInUser(): Observable<AuthFailure | User> {
    return this.auth.user.pipe(
      map((firebaseUser) => {
        if (firebaseUser) {
          return new User(
            new UniqueId(firebaseUser.uid),
            new EmailAddress(`${firebaseUser.email}`),
            `${firebaseUser.displayName}`
          );
        }

        return AuthFailure.USER_NOT_SIGNED_IN;
      })
    );
  }
}
