import { ChatMessage } from './chat';
import { Notification } from './notification';

export enum ServerMessageType {
  chat = 'chat',
  notification = 'notification',
}

export type ServerMessage =
  | {
      type: ServerMessageType.chat;
      data: ChatMessage;
    }
  | {
      type: ServerMessageType.notification;
      data: Notification;
    };
