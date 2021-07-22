import { EmailAddress } from '@auth/value-objects/email-address';
import { Entity } from '@shared/entities/entity';
import { UniqueId } from '@shared/value-objects/uuid';

export class User extends Entity {
  id: UniqueId;
  emailAddress: EmailAddress;
  displayName: string;

  constructor(id: UniqueId, emailAddress: EmailAddress, displayName: string) {
    super();
    this.id = id;
    this.emailAddress = emailAddress;
    this.displayName = displayName;
  }

  equalsTo(objectToCompare: this): boolean {
    return this.id.equalsTo(objectToCompare.id);
  }
}
