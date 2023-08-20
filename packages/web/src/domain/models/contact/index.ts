import { Friend, Group } from '@yx-chat/shared/types';
import { ContactUnitCollection } from './contact-unit-collection';
import { FriendModel } from './friend';
import { GroupModel } from './group';

/** Domain entity of contacts */
export class ContactManager {
  private _friendCollection: ContactUnitCollection<FriendModel> =
    new ContactUnitCollection();
  private _groupCollection: ContactUnitCollection<GroupModel> =
    new ContactUnitCollection();
  get friendCollection() {
    return this._friendCollection;
  }
  get groupCollection() {
    return this._groupCollection;
  }
  init({ friends, groups }: { friends: Friend[]; groups: Group[] }) {
    this._friendCollection.init(friends.map(item => new FriendModel(item)));
    this._groupCollection.init(groups.map(item => new GroupModel(item)));
  }
  clear() {
    this._friendCollection.clear();
    this._groupCollection.clear();
  }
}
