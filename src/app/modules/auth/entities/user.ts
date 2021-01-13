import { EmailAddress } from '../value-objects/email-address';
import { UniqueId } from '../../../shared/value-objects/uuid';

export class User {
  id: UniqueId;
  emailAddress: EmailAddress;
  displayName: string;

  constructor(id: UniqueId, emailAddress: EmailAddress, displayName: string) {
    this.id = id;
    this.emailAddress = emailAddress;
    this.displayName = displayName;
  }
}
