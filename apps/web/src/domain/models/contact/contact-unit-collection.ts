import type { IContactUnit } from './typing';

export class ContactUnitCollection<T extends IContactUnit = IContactUnit> {
  private _list: T[] = [];
  private _selectedId: string | undefined;
  get list() {
    return this._list;
  }

  get selectedItem(): IContactUnit | undefined {
    return this._list.find(item => item.id === this._selectedId);
  }

  get selectedId() {
    return this._selectedId;
  }

  async selectById(id: string) {
    if (id !== this._selectedId) {
      this._selectedId = id;
      await this.selectedItem?.chatMessageCollection.clearUnread();
    }
  }

  addItem(item: T) {
    this._list.push(item);
  }

  init(list: T[]) {
    this._list = list;
    // if (this._list.length) {
    //   this._selectedId = this._list[0].id;
    // }
  }

  includes(id: string) {
    return this._list.find(item => item.id === id);
  }

  clear() {
    this._list = [];
    this._selectedId = undefined;
  }
}
