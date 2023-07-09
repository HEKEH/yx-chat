import { Group } from '@yx-chat/shared/types';
import { GroupModel } from './group';

export class GroupCollection {
  private _list: GroupModel[] = [];
  get list() {
    return this._list;
  }
  init(groups: Group[]) {
    this._list = groups.map(group => new GroupModel(group));
  }
  clear() {
    this._list = [];
  }
}
