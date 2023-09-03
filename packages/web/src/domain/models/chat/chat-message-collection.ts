import { ChatMessagesRecord } from '@yx-chat/shared/types';
import { IContactUnit } from '../contact/typing';
import { IUser } from '../typing';
import { IChatMessageModel, chatMessageFactory } from './chat-message';

/** Chat messages of a friend or a group */
export class ChatMessageCollection {
  readonly id: string;

  private _chatMessages: IChatMessageModel[];

  private _unread: number;

  private _owner: IContactUnit | undefined;

  setOwner(owner: IContactUnit) {
    this._owner = owner;
  }

  get owner() {
    if (!this._owner) {
      throw new Error('owner not initialized yet');
    }
    return this._owner;
  }

  get chatChatMessages() {
    return this._chatMessages;
  }

  get latestMessage() {
    return this._chatMessages.length
      ? this._chatMessages[this._chatMessages.length - 1]
      : undefined;
  }

  get unread() {
    return this._unread;
  }

  private constructor(props: {
    id: string;
    chatMessages: IChatMessageModel[];
    unread: number;
    owner?: IContactUnit;
  }) {
    this.id = props.id;
    this._chatMessages = props.chatMessages;
    this._unread = props.unread;
    this._owner = props.owner;
  }

  static createByRawData({
    id,
    messagesRecord,
    userMap,
  }: {
    id: string;
    messagesRecord: ChatMessagesRecord | undefined;
    userMap: Record<string, IUser>; // includes self
  }): ChatMessageCollection {
    const messageModels =
      messagesRecord?.messages.map(message => {
        const from = userMap[message.from._id]; // may be undefined, if message from a stranger
        return chatMessageFactory.create(message, from);
      }) || [];
    return new ChatMessageCollection({
      id,
      chatMessages: messageModels,
      unread: messagesRecord?.unread || 0,
    });
  }
  static createEmpty(id: string): ChatMessageCollection {
    return new ChatMessageCollection({
      id,
      chatMessages: [],
      unread: 0,
    });
  }
}
