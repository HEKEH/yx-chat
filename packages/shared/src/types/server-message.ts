import { ChatMessage } from './chat';
import { Friend } from './contact';
import { Notification } from './notification';

export enum ServerMessageType {
  chat = 'chat',
  notification = 'notification',
  friendAccepted = 'friendAccepted',
}

export type ServerMessage =
  | {
      type: ServerMessageType.chat;
      data: ChatMessage;
    }
  | {
      type: ServerMessageType.notification;
      data: Notification;
    }
  | {
      type: ServerMessageType.friendAccepted;
      data: Friend;
    };
