import { ChatMessage, ChatMessageFormat } from '@yx-chat/shared/types';
import { GeneralTime } from '../common/time';

interface MessageFrom {
  readonly id: string;
  readonly name: string;
  readonly avatar: string;
}

export interface IChatMessageModel {
  readonly id: string;
  readonly deleted: boolean;
  readonly createTime: GeneralTime;
  readonly type: ChatMessageFormat;
  readonly content: string;
  readonly brief: string;
  readonly from: MessageFrom;
  delete: () => Promise<void>;
  save: () => Promise<boolean>;
}

abstract class AbstractChatMessageModel implements IChatMessageModel {
  protected _deleted: boolean;

  readonly from: MessageFrom;

  get deleted() {
    return this._deleted;
  }

  readonly createTime: GeneralTime;

  readonly id: string;

  readonly content: string;

  constructor(from: MessageFrom, message: ChatMessage) {
    this.from = from;
    this.id = message._id;
    this._deleted = message.deleted;
    this.content = message.content;
    this.createTime = new GeneralTime(message.createTime);
  }

  abstract delete(): Promise<void>;

  abstract save(): Promise<boolean>;

  abstract readonly type: ChatMessageFormat;
  abstract readonly brief: string;
}

class TextChatMessageModel extends AbstractChatMessageModel {
  readonly type = ChatMessageFormat.text;
  constructor(from: MessageFrom, message: ChatMessage) {
    super(from, message);
  }
  get brief() {
    return this.content;
  }

  async delete() {
    // TODO
  }

  async save() {
    // TODO
    return true;
  }
}

export const chatMessageFactory = {
  create(
    message: ChatMessage,
    messageFrom: MessageFrom | undefined,
  ): IChatMessageModel {
    // if not designate, just like a strange group member, then fetch info from message itself
    const from = messageFrom || {
      id: message.from._id,
      name: message.from.username,
      avatar: message.from.avatar,
    };
    switch (message.type) {
      case ChatMessageFormat.text:
        return new TextChatMessageModel(from, message);
    }
  },
};
