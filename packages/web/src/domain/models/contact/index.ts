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
  private _currentContactCollectionKey: 'friends' | 'groups' = 'friends';
  get friendCollection() {
    return this._friendCollection;
  }
  get groupCollection() {
    return this._groupCollection;
  }
  get currentContactCollectionKey() {
    return this._currentContactCollectionKey;
  }
  get currentContact() {
    return this._currentContactCollectionKey === 'friends'
      ? this._friendCollection.selectedItem
      : this._groupCollection.selectedItem;
  }
  setContactCollectionKey(key: 'friends' | 'groups') {
    this._currentContactCollectionKey = key;
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
