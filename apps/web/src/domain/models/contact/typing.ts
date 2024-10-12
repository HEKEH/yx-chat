import { IChatMessageModel } from '../chat/chat-message';
import { ChatMessageCollection } from '../chat/chat-message-collection';
import { GeneralTime } from '../common/time';
import { IUser } from '../typing';

export interface IContactUnit extends IUser {
  readonly chatMessageCollection: ChatMessageCollection;
  setChatMessageCollection(chatMessageCollection: ChatMessageCollection): void;
  /** For friend, the key is selfId + friend's id. for group, it is the group id */
  readonly messageOwnerKey: string;
  readonly latestMessage: IChatMessageModel | undefined;
  readonly latestMessageBrief: string | undefined;
  /** Time for display, message time or create time */
  readonly displayTime: GeneralTime;
  readonly unread: number;
}
