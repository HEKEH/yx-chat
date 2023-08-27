import { ChatMessageCollection } from '../chat/chat-message-collection';
import { IUser } from '../typing';

export interface IContactUnit extends IUser {
  readonly chatMessageCollection: ChatMessageCollection;
  setChatMessageCollection(chatMessageCollection: ChatMessageCollection): void;
  getMessageOwnerKey(selfId: string): string;
}
