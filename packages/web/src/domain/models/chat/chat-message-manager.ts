import { ChatMessageCollection } from './chat-message-collection';

/** Model of chat menu */
export class ChatMessageManager {
  private _selectedId: string | undefined;
  private _list: ChatMessageCollection[] = [];

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
      const aTime = a.owner.displayTime.value;
      const bTime = b.owner.displayTime.value;
      if (aTime.isSame(bTime)) {
        return 0;
      }
      return aTime.isAfter(bTime) ? -1 : 1;
    });
    this._list = list;
  }

  init(chatMessageCollectionList: ChatMessageCollection[]) {
    this._list = chatMessageCollectionList;
    this._sortList();
    this._selectedId = this._list[0]?.id;
  }
}
