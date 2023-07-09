import { Friend, Group } from '@yx-chat/shared/types';
import { FriendCollection } from './friend-collection';
import { GroupCollection } from './group-collection';

/** Domain entity of contacts */
export class ContactManager {
  private _friendCollection: FriendCollection = new FriendCollection();
  private _groupCollection: GroupCollection = new GroupCollection();
  get friendCollection(): FriendCollection {
    return this._friendCollection;
  }
  get groupCollection(): GroupCollection {
    return this._groupCollection;
  }
  init({ friends, groups }: { friends: Friend[]; groups: Group[] }) {
    this._friendCollection.init(friends);
    this._groupCollection.init(groups);
  }
  clear() {
    this._friendCollection.clear();
    this._groupCollection.clear();
  }
}
