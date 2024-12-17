import type { Group } from '@yx-chat/shared/types';
import { AbstractContactUnit } from './abstract-contact-unit';

export class GroupModel extends AbstractContactUnit {
  constructor(group: Group) {
    super(group);
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
