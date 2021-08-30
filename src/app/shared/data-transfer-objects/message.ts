import { Message } from '@shared/entities/message';
import { UniqueId } from '@shared/value-objects/uuid';

export interface IMessageDto {
  id: string;
  text: string;
  severity: number;
}

export class MessageDto implements IMessageDto {
  id: string;
  text: string;
  severity: number;

  constructor(id: string, text: string, severity: number) {
    this.id = id;
    this.text = text;
    this.severity = severity;
  }

  static fromDomain(message: Message): MessageDto {
    return new MessageDto(message.id.value, message.text, message.severity);
  }

  static fromObject(message: IMessageDto): MessageDto {
    return new MessageDto(message.id, message.text, message.severity);
  }

  static isValid(message: IMessageDto | unknown): message is IMessageDto {
    return (message as IMessageDto).id !== undefined;
  }

  toObject(): IMessageDto {
    return JSON.parse(JSON.stringify(this));
  }

  toDomain(): Message {
    return new Message(new UniqueId(this.id), this.text, this.severity);
  }
}
