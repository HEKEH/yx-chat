import {
  ChatMessage,
  ChatMessageFormat,
  ChatMessageItem,
} from '@yx-chat/shared/types';
import { GeneralTime } from '../common/time';

interface MessageFrom {
  readonly id: string;
  readonly name: string;
  readonly avatar: string;
}
export class ChatMessageModel {
  protected _deleted: boolean;

  readonly from: MessageFrom;

  get deleted() {
    return this._deleted;
  }

  readonly createTime: GeneralTime;

  readonly id: string;

  readonly items: ChatMessageItem[];

  constructor(from: MessageFrom, message: ChatMessage) {
    this.from = from;
    this.id = message.id;
    this._deleted = message.deleted;
    this.items = message.items;
    this.createTime = new GeneralTime(message.createTime);
  }

  get brief() {
    const briefs = this.items.map(item => {
      switch (item.type) {
        case ChatMessageFormat.text:
          return item.data;
        case ChatMessageFormat.image:
          // TODO
          return '[图片]';
        case ChatMessageFormat.file:
          // TODO
          return '[文件]';
      }
    });
    const brief = briefs.join(' ');
    if (brief.length > 10) {
      return brief.slice(0, 10) + '...';
    }
    return brief;
  }
}

export const chatMessageFactory = {
  create(
    message: ChatMessage,
    messageFrom: MessageFrom | undefined,
  ): ChatMessageModel {
    // if not designate, just like a strange group member, then fetch info from message itself
    const from = messageFrom || {
      id: message.from.id,
      name: message.from.username,
      avatar: message.from.avatar,
    };

    return new ChatMessageModel(from, message);
  },
};
