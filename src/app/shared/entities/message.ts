import { Entity } from './entity';
import { Severity } from '@shared/enums/severity';
import { UniqueId } from '@shared/value-objects/uuid';

export class Message extends Entity {
  id: UniqueId;
  text: string;
  severity: Severity;

  constructor(id: UniqueId, text: string, severity: Severity) {
    super();
    this.id = id;
    this.text = text;
    this.severity = severity;
  }

  equalsTo(objectToCompare: this): boolean {
    return this.id.equalsTo(objectToCompare.id);
  }
}
