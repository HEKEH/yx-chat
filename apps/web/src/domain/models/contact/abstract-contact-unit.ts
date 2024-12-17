import type { ChatMessageCollection } from '../chat/chat-message-collection';
import type { IContactUnit } from './typing';
import { GeneralTime } from '../common/time';

export abstract class AbstractContactUnit implements IContactUnit {
  protected _name: string;
  protected _avatar: string;
  protected _chatMessageCollection: ChatMessageCollection | undefined;

  readonly id: string;
  readonly createTime: GeneralTime;

  get name() {
    return this._name;
  }

  get avatar() {
    return this._avatar;
  }

  /** Time for display, message time or create time */
  get displayTime() {
    return this.latestMessage ? this.latestMessage.createTime : this.createTime;
  }

  constructor(props: {
    id: string;
    name: string;
    avatar: string;
    createTime: string;
  }) {
    this.id = props.id;
    this._name = props.name;
    this._avatar = props.avatar;
    this.createTime = new GeneralTime(props.createTime);
  }

  get chatMessageCollection() {
    if (!this._chatMessageCollection) {
      throw new Error('chatMessageCollection has not been initiated yet');
    }
    return this._chatMessageCollection;
  }

  setChatMessageCollection(chatMessageCollection: ChatMessageCollection) {
    this._chatMessageCollection = chatMessageCollection;
    chatMessageCollection.setOwner(this);
  }

  get latestMessage() {
    return this.chatMessageCollection.latestMessage;
  }

  get unread() {
    return this.chatMessageCollection.unread;
  }

  abstract readonly messageOwnerKey: string;
  abstract get latestMessageBrief(): string | undefined;
}
