import {
  ChatMessage,
  ChatMessageFormat,
  ChatMessagesRecord,
} from '@yx-chat/shared/types';
import { SocketIO } from '~/infra/socket-io';
import { SendChatMessageRequest } from '~/infra/socket-io/message/request/send-chat-message-request';
import { IContactUnit } from '../contact/typing';
import Self from '../self';
import { IUser } from '../typing';
import { IChatMessageModel, chatMessageFactory } from './chat-message';

/** Chat messages of a friend or a group */
export class ChatMessageCollection {
  readonly id: string;

  private readonly self: Self;

  private _draftMessageType: ChatMessageFormat = ChatMessageFormat.text;

  private _list: IChatMessageModel[];

  private _unread: number;

  private _owner: IContactUnit | undefined;

  private _draft: string | undefined;

  setOwner(owner: IContactUnit) {
    this._owner = owner;
  }

  get owner() {
    if (!this._owner) {
      throw new Error('owner not initialized yet');
    }
    return this._owner;
  }

  get list() {
    return this._list;
  }

  get latestMessage() {
    return this._list.length ? this._list[this._list.length - 1] : undefined;
  }

  get unread() {
    return this._unread;
  }

  get draft() {
    return this._draft;
  }

  setDraft(draft: string) {
    this._draft = draft;
  }

  async sendChatMessage() {
    if (!this._draft) {
      return;
    }
    const request = new SendChatMessageRequest({
      to: this.owner,
      content: this._draft,
      type: this._draftMessageType,
    });
    const response = await SocketIO.instance.fetch<ChatMessage>(request);
    const message = chatMessageFactory.create(response, this.self);
    this._list.push(message);
    this._draft = undefined;
  }

  private constructor(props: {
    id: string;
    chatMessages: IChatMessageModel[];
    self: Self;
    unread: number;
    owner?: IContactUnit;
  }) {
    this.id = props.id;
    this.self = props.self;
    this._list = props.chatMessages;
    this._unread = props.unread;
    this._owner = props.owner;
  }

  static createByRawData({
    id,
    self,
    messagesRecord,
    userMap,
  }: {
    id: string;
    self: Self;
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
      self,
      chatMessages: messageModels,
      unread: messagesRecord?.unread || 0,
    });
  }
  static createEmpty(id: string, self: Self): ChatMessageCollection {
    return new ChatMessageCollection({
      id,
      self,
      chatMessages: [],
      unread: 0,
    });
  }
}
