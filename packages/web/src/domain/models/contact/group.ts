import { Group } from '@yx-chat/shared/types';
import { AbstractContactUnit } from './abstract-contact-unit';

export class GroupModel extends AbstractContactUnit {
  constructor({ _id, createTime, name, creator, avatar }: Group) {
    super({
      id: _id,
      avatar,
      name,
    });
  }

  getMessageOwnerKey(selfId: string) {
    return `${selfId}${this._id}`;
  }
}
