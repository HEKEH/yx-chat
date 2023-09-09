import { ChatMessageFormat } from './chat';

export type ServerMessageType = ChatMessageFormat; // TODO 暂时，要改成下面这样
// export enum ServerMessageType {
//   chat = 'chat'
// }

export type ServerMessage = {
  type: ServerMessageType;
};
