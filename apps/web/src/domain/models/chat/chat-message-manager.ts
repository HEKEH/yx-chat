import { ChatMessage, ServerMessageType } from '@yx-chat/shared/types';
import { Subscription } from 'rxjs';
import { SocketIO } from '~/infra/socket-io';
import { ChatMessageCollection } from './chat-message-collection';

export interface ChatMessageManagerContext {
  /** global current chatMessageCollection */
  readonly currentChatMessageCollection: ChatMessageCollection | undefined;
}

/** Model of chat menu */
export class ChatMessageManager {
  private _context: ChatMessageManagerContext | undefined;
  private _selectedId: string | undefined;
  private _list: ChatMessageCollection[] = [];
  private _messageListenSubscription: Subscription | undefined;

  get selectedItem() {
    return this._list.find(item => item.id === this._selectedId);
  }
  get list() {
    return this._list;
  }
  get selectedId() {
    return this._selectedId;
  }

  async selectById(id: string) {
    if (id !== this._selectedId) {
      this._selectedId = id;
      await this.selectedItem?.clearUnread();
    }
  }

  private _sortList() {
    const list = [...this._list];
    list.sort((a, b) => {
      const aTime = a.owner.displayTime;
      const bTime = b.owner.displayTime;
      if (aTime.isSame(bTime)) {
        return 0;
      }
      return aTime.isAfter(bTime) ? -1 : 1;
    });
    this._list = list;
  }

  private async _receiveChatMessage(message: ChatMessage) {
    const chatMessageCollection = this._list.find(item => {
      const { messageOwnerKey } = item.owner;
      return message.to === messageOwnerKey;
    });
    if (chatMessageCollection) {
      chatMessageCollection.receiveChatMessage(message);
      if (
        // if is in current chat
        chatMessageCollection === this._context?.currentChatMessageCollection
      ) {
        await chatMessageCollection.clearUnread();
      }
    } else {
      throw new Error(`incorrect message, ${JSON.stringify(message)}`);
    }
  }

  private _subscribeItem(item: ChatMessageCollection) {
    item.onHasNewChatMessage.subscribe(() => this._sortList());
  }

  init(
    context: ChatMessageManagerContext,
    chatMessageCollectionList: ChatMessageCollection[],
  ) {
    this._context = context;
    this._list = chatMessageCollectionList;
    this._sortList();
    // this._selectedId = this._list[0]?.id;
    this._list.forEach(item => this._subscribeItem(item));
    this._messageListenSubscription = SocketIO.instance.addMessageListener<{
      type: ServerMessageType.chat;
      data: ChatMessage;
    }>(ServerMessageType.chat, (message: ChatMessage) => {
      this._receiveChatMessage(message);
    });
  }

  addItem(item: ChatMessageCollection) {
    this._list.push(item);
    this._sortList();
    this._subscribeItem(item);
  }

  clear() {
    this._context = undefined;
    this._list.forEach(item => item.clear());
    this._messageListenSubscription!.unsubscribe();
    this._messageListenSubscription = undefined;
    this._list = [];
    this._selectedId = undefined;
  }
}
