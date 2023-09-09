import { Group } from '@yx-chat/shared/types';
import { AbstractContactUnit } from './abstract-contact-unit';

export class GroupModel extends AbstractContactUnit {
  constructor({ _id, createTime, name, creator, avatar }: Group) {
    super({
      id: _id,
      avatar,
      name,
      createTime,
    });
  }

  get messageOwnerKey() {
    return this.id;
  }

  get latestMessageBrief() {
    if (!this.latestMessage) {
      return;
    }
    return `${this.latestMessage.from.name}: ${this.latestMessage.brief}`;
  }
}
