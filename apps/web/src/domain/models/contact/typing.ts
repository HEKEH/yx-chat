import type { ChatMessageModel } from '../chat/chat-message';
import type { ChatMessageCollection } from '../chat/chat-message-collection';
import type { GeneralTime } from '../common/time';
import type { IUser } from '../typing';

export interface IContactUnit extends IUser {
  readonly chatMessageCollection: ChatMessageCollection;
  setChatMessageCollection: (
    chatMessageCollection: ChatMessageCollection,
  ) => void;
  /** For friend, the key is selfId + friend's id. for group, it is the group id */
  readonly messageOwnerKey: string;
  readonly latestMessage: ChatMessageModel | undefined;
  readonly latestMessageBrief: string | undefined;
  /** Time for display, message time or create time */
  readonly displayTime: GeneralTime;
  readonly unread: number;
}
