import { Friend } from '@yx-chat/shared/types';
import { FriendModel } from './friend';

export class FriendCollection {
  private _list: FriendModel[] = [];
  private _selectedId: string | undefined;
  get list() {
    return this._list;
  }
  get selectedItem(): FriendModel | undefined {
    return this._list.find(item => item.id === this._selectedId);
  }
  get selectedId() {
    return this._selectedId;
  }
  selectById(id: string) {
    if (id !== this._selectedId) {
      this._selectedId = id;
    }
  }
  init(friends: Friend[]) {
    this._list = friends.map(friend => new FriendModel(friend));
    if (this._list.length) {
      this._selectedId = this._list[0].id;
    }
  }
  clear() {
    this._list = [];
    this._selectedId = undefined;
  }
}
