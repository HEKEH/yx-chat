import type {
  ChatMessage,
  ChatMessagesRecord,
  HistoryChatMessagesResponse,
  UpdateHistoryResponse,
} from '@yx-chat/shared/types';
import type { IContactUnit } from '../contact/typing';
import type Self from '../self';
import type { IUser } from '../typing';
import type { ChatMessageModel } from './chat-message';
import { Subject } from 'rxjs';
import { SocketIO } from '~/infra/socket-io';
import { GetHistoryChatMessagesRequest } from '~/infra/socket-io/request/get-history-chat-messages-request';
import { SendChatMessageRequest } from '~/infra/socket-io/request/send-chat-message-request';
import { UpdateHistoryRequest } from '~/infra/socket-io/request/update-history-request';
import { chatMessageFactory } from './chat-message';
import MessageDraft from './massage-draft';

export interface ChatMessageCollectionContext {
  readonly self: Self;
  readonly userMap: Record<string, IUser>;
}

/** Chat messages of a friend or a group */
export class ChatMessageCollection {
  readonly id: string;

  readonly onHasNewChatMessage = new Subject<void>();

  private readonly _context: ChatMessageCollectionContext;

  private _list: ChatMessageModel[];

  private _unread: number;

  private _owner: IContactUnit | undefined;

  private _draft = new MessageDraft();

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

  async sendChatMessage() {
    const chatItems = await this._draft.generateChatItems();
    if (!chatItems?.length) {
      return;
    }
    const request = new SendChatMessageRequest({
      to: this.owner,
      items: chatItems,
    });
    const response = await SocketIO.instance.fetch<ChatMessage>(request);
    const message = chatMessageFactory.create(response, this._context.self);
    this._list.push(message);
    this._draft.clear();
    this._sortMessages();
    this.onHasNewChatMessage.next();
  }

  async clearUnread() {
    if (this._unread && this.latestMessage) {
      this._unread = 0;
      await SocketIO.instance.fetch<UpdateHistoryResponse>(
        new UpdateHistoryRequest({
          contactKey: this.owner.messageOwnerKey,
          messageId: this.latestMessage.id,
        }),
      );
    }
  }

  private _createChatMessageModel(message: ChatMessage): ChatMessageModel {
    const fromId = message.from.id;
    return chatMessageFactory.create(message, this._context.userMap[fromId]);
  }

  receiveChatMessage(message: ChatMessage) {
    this._list.push(this._createChatMessageModel(message));
    this._sortMessages();
    this._unread++;
    this.onHasNewChatMessage.next();
  }

  clear() {
    this.onHasNewChatMessage.unsubscribe();
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
    chatMessages: ChatMessageModel[];
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
  }: {
    id: string;
    context: ChatMessageCollectionContext;
    messagesRecord?: ChatMessagesRecord;
  }): ChatMessageCollection {
    const messageModels =
      messagesRecord?.messages.map(message => {
        const from = context.userMap[message.from.id]; // may be undefined, if message from a stranger
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
