import { ChatMessage, ChatMessageFormat } from '@yx-chat/shared/types';

interface MessageFrom {
  readonly id: string;
  readonly name: string;
  readonly avatar: string;
}

export interface IChatMessageModel {
  readonly deleted: boolean;
  readonly createTime: string;
  readonly type: ChatMessageFormat;
  readonly content: string;
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

  readonly createTime: string;

  readonly id: string;

  readonly content: string;

  constructor(from: MessageFrom, message: ChatMessage) {
    this.from = from;
    this.id = message._id;
    this._deleted = message.deleted;
    this.content = message.content;
    this.createTime = message.createTime;
  }

  abstract delete(): Promise<void>;

  abstract save(): Promise<boolean>;

  abstract readonly type: ChatMessageFormat;
}

class TextChatMessageModel extends AbstractChatMessageModel {
  readonly type = ChatMessageFormat.text;
  constructor(from: MessageFrom, message: ChatMessage) {
    super(from, message);
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
