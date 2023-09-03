import { Friend } from '@yx-chat/shared/types';
import { AbstractContactUnit } from './abstract-contact-unit';

export class FriendModel extends AbstractContactUnit {
  constructor({ to, createTime }: Friend) {
    super({
      id: to._id,
      avatar: to.avatar,
      name: to.username,
      createTime,
    });
  }

  getMessageOwnerKey(selfId: string) {
    return `${selfId}${this.id}`;
  }

  get latestMessageBrief() {
    return this.latestMessage?.brief;
  }
}
