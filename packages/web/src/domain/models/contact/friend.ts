import { Friend } from '@yx-chat/shared/types';

export class FriendModel {
  private _id: string;
  private _username: string;
  private _avatar: string;

  get id() {
    return this._id;
  }

  get name() {
    return this._username;
  }

  get avatar() {
    return this._avatar;
  }

  constructor({ to }: Friend) {
    this._id = to._id;
    this._username = to.username;
    this._avatar = to.avatar;
  }
}
