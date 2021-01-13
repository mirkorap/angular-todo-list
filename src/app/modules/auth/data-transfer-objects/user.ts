import { UniqueId } from '../../../shared/value-objects/uuid';
import { User as UserEntity } from '../entities/user';
import { EmailAddress } from '../value-objects/email-address';

export interface User {
  id: string;
  emailAddress: string;
  displayName: string;
}

export class UserDto implements User {
  id: string;
  emailAddress: string;
  displayName: string;

  static fromDomain(user: UserEntity): User {
    return {
      id: user.id.value,
      emailAddress: user.emailAddress.value,
      displayName: user.displayName
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
