import { EmailAddress } from '@auth/value-objects/email-address';
import { UniqueId } from '@shared/value-objects/uuid';
import { User } from '@auth/entities/user';
import firebase from 'firebase/app';

export interface IUserDto {
  id: string;
  emailAddress: string;
  displayName: string;
}

export class UserDto implements IUserDto {
  id: string;
  emailAddress: string;
  displayName: string;

  constructor(id: string, emailAddress: string, displayName: string) {
    this.id = id;
    this.emailAddress = emailAddress;
    this.displayName = displayName;
  }

  static fromDomain(user: User): UserDto {
    return new UserDto(
      user.id.value,
      user.emailAddress.value,
      user.displayName
    );
  }

  static fromObject(user: IUserDto): UserDto {
    return new UserDto(user.id, user.emailAddress, user.displayName);
  }

  static fromFirebase(user: firebase.User): UserDto {
    return new UserDto(user.uid, `${user.email}`, `${user.displayName}`);
  }

  static isValid(user: IUserDto | unknown): user is IUserDto {
    return (user as IUserDto).id !== undefined;
  }

  toObject(): IUserDto {
    return {
      id: this.id,
      emailAddress: this.emailAddress,
      displayName: this.displayName
    };
  }

  toDomain(): User {
    return new User(
      new UniqueId(this.id),
      new EmailAddress(this.emailAddress),
      this.displayName
    );
  }
}
