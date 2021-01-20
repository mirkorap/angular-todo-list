import { EmailAddress } from '../value-objects/email-address';
import { UniqueId } from '../../../shared/value-objects/uuid';
import { User as UserEntity } from '../entities/user';

export interface User {
  id: string;
  emailAddress: string;
  displayName: string;
}

export class UserDto implements User {
  id: string;
  emailAddress: string;
  displayName: string;

  constructor(id: string, emailAddress: string, displayName: string) {
    this.id = id;
    this.emailAddress = emailAddress;
    this.displayName = displayName;
  }

  static fromDomain(user: UserEntity): UserDto {
    return new UserDto(
      user.id.value,
      user.emailAddress.value,
      user.displayName
    );
  }

  static fromObject(user: User): UserDto {
    return new UserDto(user.id, user.emailAddress, user.displayName);
  }

  toObject(): User {
    return {
      id: this.id,
      emailAddress: this.emailAddress,
      displayName: this.displayName
    };
  }

  toDomain(): UserEntity {
    return new UserEntity(
      new UniqueId(this.id),
      new EmailAddress(this.emailAddress),
      this.displayName
    );
  }
}
