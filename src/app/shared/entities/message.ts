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

  static info(id: UniqueId, text: string): Message {
    return new Message(id, text, Severity.INFO);
  }

  static warn(id: UniqueId, text: string): Message {
    return new Message(id, text, Severity.WARN);
  }

  static error(id: UniqueId, text: string): Message {
    return new Message(id, text, Severity.ERROR);
  }

  static success(id: UniqueId, text: string): Message {
    return new Message(id, text, Severity.SUCCESS);
  }

  equalsTo(objectToCompare: this): boolean {
    return this.id.equalsTo(objectToCompare.id);
  }
}
