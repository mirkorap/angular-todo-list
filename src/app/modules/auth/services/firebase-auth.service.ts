import { AngularFireAuth } from '@angular/fire/auth';
import { AuthFailure } from '@auth/failures/auth-failure';
import { AuthService } from './auth.service';
import { EmailAddress } from '@auth/value-objects/email-address';
import { Injectable } from '@angular/core';
import { Password } from '@auth/value-objects/password';
import { User } from '@auth/entities/user';
import { UserDto } from '@auth/data-transfer-objects/user';
import firebase from 'firebase/app';

@Injectable()
export class FirebaseAuthService implements AuthService {
  constructor(private auth: AngularFireAuth) {}

  async registerWithEmailAndPassword(
    emailAddress: EmailAddress,
    password: Password
  ): Promise<AuthFailure | User> {
    try {
      const firebaseUser = await this.auth.createUserWithEmailAndPassword(
        emailAddress.value,
        password.value
      );

      if (!firebaseUser.user) {
        return AuthFailure.SERVER_ERROR;
      }

      return UserDto.fromFirebase(firebaseUser.user).toDomain();
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
  ): Promise<AuthFailure | User> {
    try {
      const firebaseUser = await this.auth.signInWithEmailAndPassword(
        emailAddress.value,
        password.value
      );

      if (!firebaseUser.user) {
        return AuthFailure.SERVER_ERROR;
      }

      return UserDto.fromFirebase(firebaseUser.user).toDomain();
    } catch (error) {
      if (['auth/user-not-found', 'auth/wrong-password'].includes(error.code)) {
        return AuthFailure.INVALID_EMAIL_AND_PASSWORD;
      }

      return AuthFailure.SERVER_ERROR;
    }
  }

  async signInWithGoogle(): Promise<AuthFailure | User> {
    try {
      const googleUser = await this.auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );

      if (!googleUser.user) {
        return AuthFailure.SERVER_ERROR;
      }

      return UserDto.fromFirebase(googleUser.user).toDomain();
    } catch (error) {
      return AuthFailure.CANCELLED_BY_USER;
    }
  }

  async signOut(): Promise<void> {
    await this.auth.signOut();
  }
}
