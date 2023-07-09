import { Group } from '@yx-chat/shared/types';

export class GroupModel {
  private _id: string;
  private _name: string;
  private _avatar: string;

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get avatar() {
    return this._avatar;
  }

  constructor({ _id, createTime, name, creator, avatar }: Group) {
    this._id = _id;
    this._name = name;
    this._avatar = avatar;
  }
}
