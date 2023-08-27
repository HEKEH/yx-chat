import { Friend } from '@yx-chat/shared/types';
import { AbstractContactUnit } from './abstract-contact-unit';

export class FriendModel extends AbstractContactUnit {
  constructor({ to }: Friend) {
    super({
      id: to._id,
      avatar: to.avatar,
      name: to.username,
    });
  }

  getMessageOwnerKey(selfId: string) {
    return `${selfId}${this._id}`;
  }
}
