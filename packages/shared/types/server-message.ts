import { ChatMessage, SystemMessage } from './chat';

export enum ServerMessageType {
  chat = 'chat',
  system = 'system',
}

export type ServerMessage =
  | {
      type: ServerMessageType.chat;
      data: ChatMessage;
    }
  | {
      type: ServerMessageType.system;
      data: SystemMessage; // TODO
    };
