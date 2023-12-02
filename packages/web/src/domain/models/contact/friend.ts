import { Friend } from '@yx-chat/shared/types';
import { AbstractContactUnit } from './abstract-contact-unit';

export class FriendModel extends AbstractContactUnit {
  readonly messageOwnerKey: string;
  constructor({ to, createTime }: Friend, selfId: string) {
    super({
      id: to.id,
      avatar: to.avatar,
      name: to.username,
      createTime,
    });
    this.messageOwnerKey = `${selfId}${this.id}`;
  }

  get latestMessageBrief() {
    return this.latestMessage?.brief;
  }
}
