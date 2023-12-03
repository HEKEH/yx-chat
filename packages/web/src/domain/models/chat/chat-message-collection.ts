import {
  ChatMessage,
  ChatMessageFormat,
  ChatMessagesRecord,
  HistoryChatMessagesResponse,
} from '@yx-chat/shared/types';
import { SocketIO } from '~/infra/socket-io';
import { SendChatMessageRequest } from '~/infra/socket-io/request/send-chat-message-request';
import { GetHistoryChatMessagesRequest } from '~/infra/socket-io/request/get-history-chat-messages-request';
import { Subject } from 'rxjs';
import { IContactUnit } from '../contact/typing';
import Self from '../self';
import { IUser } from '../typing';
import { IChatMessageModel, chatMessageFactory } from './chat-message';

interface ChatMessageCollectionContext {
  readonly self: Self;
}

/** Chat messages of a friend or a group */
export class ChatMessageCollection {
  readonly id: string;

  readonly onHasNewChatMessage = new Subject<void>();

  private readonly _context: ChatMessageCollectionContext;

  private _draftMessageType: ChatMessageFormat = ChatMessageFormat.text;

  private _list: IChatMessageModel[];

  private _unread: number;

  private _owner: IContactUnit | undefined;

  private _draft: string | undefined;

  private _isAllHistoryChatMessagesFetched = false;

  setOwner(owner: IContactUnit) {
    this._owner = owner;
  }

  /**
   * @returns whether to fetch new data
   */
  async fetchHistoryChatMessages(): Promise<boolean> {
    if (this._isAllHistoryChatMessagesFetched) {
      return false;
    }
    let historyChatMessages =
      await SocketIO.instance.fetch<HistoryChatMessagesResponse>(
        new GetHistoryChatMessagesRequest({
          contact: this.owner,
          offset: this._list.length,
        }),
      );
    const existChatMessageIds = new Set(
      this._list.map(chatMessage => chatMessage.id),
    );
    historyChatMessages = historyChatMessages.filter(
      msg => !existChatMessageIds.has(msg.id),
    ); // Remove duplicates
    if (!historyChatMessages.length) {
      this._isAllHistoryChatMessagesFetched = true;
      return false;
    }
    const messageModels = historyChatMessages.map(msg =>
      this._createChatMessageModel(msg),
    );
    this._list.unshift(...messageModels);
    this._sortMessages();
    return true;
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
    const message = chatMessageFactory.create(response, this._context.self);
    this._list.push(message);
    this._draft = undefined;
    this._sortMessages();
    this.onHasNewChatMessage.next();
  }

  private _createChatMessageModel(message: ChatMessage): IChatMessageModel {
    let messageFrom: IUser;
    const fromId = message.from.id;
    if (fromId === this._context.self.id) {
      messageFrom = this._context.self;
    } else if (fromId === this.owner.id) {
      messageFrom = this.owner;
    } else {
      throw new Error('incorrect sender id: ' + fromId);
    }
    return chatMessageFactory.create(message, messageFrom);
  }

  receiveChatMessage(message: ChatMessage) {
    this._list.push(this._createChatMessageModel(message));
    this._sortMessages();
    this.onHasNewChatMessage.next();
  }

  /** sort by time */
  private _sortMessages() {
    this._list.sort((a, b) => {
      const timeA = a.createTime;
      const timeB = b.createTime;
      if (timeA.isSame(timeB)) {
        return 0;
      }
      return timeA.isBefore(timeB) ? -1 : 1;
    });
  }

  private constructor(props: {
    id: string;
    chatMessages: IChatMessageModel[];
    context: ChatMessageCollectionContext;
    unread: number;
    owner?: IContactUnit;
  }) {
    this.id = props.id;
    this._context = props.context;
    this._list = props.chatMessages;
    this._unread = props.unread;
    this._owner = props.owner;
  }

  static createByRawData({
    id,
    context,
    messagesRecord,
    userMap,
  }: {
    id: string;
    context: ChatMessageCollectionContext;
    messagesRecord: ChatMessagesRecord | undefined;
    userMap: Record<string, IUser>; // includes self
  }): ChatMessageCollection {
    const messageModels =
      messagesRecord?.messages.map(message => {
        const from = userMap[message.from.id]; // may be undefined, if message from a stranger
        return chatMessageFactory.create(message, from);
      }) || [];
    return new ChatMessageCollection({
      id,
      context,
      chatMessages: messageModels,
      unread: messagesRecord?.unread || 0,
    });
  }
  static createEmpty(
    id: string,
    context: ChatMessageCollectionContext,
  ): ChatMessageCollection {
    return new ChatMessageCollection({
      id,
      context,
      chatMessages: [],
      unread: 0,
    });
  }
}
