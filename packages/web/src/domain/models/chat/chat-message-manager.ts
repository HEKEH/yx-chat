import { SocketIO } from '~/infra/socket-io';
import { ChatMessage, ChatMessageFormat } from '@yx-chat/shared/types';
import { ChatMessageCollection } from './chat-message-collection';

/** Model of chat menu */
export class ChatMessageManager {
  private _selectedId: string | undefined;
  private _list: ChatMessageCollection[] = [];

  /** Use arrow functions so no need to bind this, keep the function unique */
  private _receiveChatMessage = (message: ChatMessage) => {
    const chatMessageCollection = this._list.find(item => {
      const messageOwnerKey = item.owner.messageOwnerKey;
      return message.to === messageOwnerKey;
    });
    if (chatMessageCollection) {
      chatMessageCollection.receiveChatMessage(message);
    } else {
      throw new Error(`incorrect message, ${JSON.stringify(message)}`);
    }
  };

  get selectedItem() {
    return this._list.find(item => item.id === this._selectedId);
  }
  get list() {
    return this._list;
  }
  get selectedId() {
    return this._selectedId;
  }

  selectById(id: string) {
    if (id !== this._selectedId) {
      this._selectedId = id;
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

  init(chatMessageCollectionList: ChatMessageCollection[]) {
    this._list = chatMessageCollectionList;
    this._list.forEach(item =>
      item.onHasNewChatMessage.subscribe(() => this._sortList()),
    );
    this._sortList();
    this._selectedId = this._list[0]?.id;
    SocketIO.instance.addMessageListener<ChatMessage>(
      ChatMessageFormat.text,
      this._receiveChatMessage,
    );
    // TODO 改成下面的样子
    // SocketIO.instance.addMessageListener<XXX>(
    //   ServerMessageType.chat,
    //   this._receiveChatMessage,
    // );
  }

  clear() {
    this._list = [];
    this._list.forEach(item => item.onHasNewChatMessage.unsubscribe());
    this._selectedId = undefined;
    SocketIO.instance.removeMessageListener<ChatMessage>(
      ChatMessageFormat.text,
      this._receiveChatMessage,
    );
    // TODO 改成下面的样子
    // SocketIO.instance.addMessageListener<XXX>(
    //   ServerMessageType.chat,
    //   this._receiveChatMessage,
    // );
  }
}
