import { ChatMessageCollection } from '../chat/chat-message-collection';
import { IContactUnit } from './typing';

export abstract class AbstractContactUnit implements IContactUnit {
  protected _id: string;
  protected _name: string;
  protected _avatar: string;
  protected _chatMessageCollection: ChatMessageCollection | undefined;

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get avatar() {
    return this._avatar;
  }

  constructor(props: { id: string; name: string; avatar: string }) {
    this._id = props.id;
    this._name = props.name;
    this._avatar = props.avatar;
  }

  abstract getMessageOwnerKey(selfId: string): string;

  get chatMessageCollection() {
    if (!this._chatMessageCollection) {
      throw new Error('chatMessageCollection does not exist yet');
    }
    return this._chatMessageCollection;
  }

  setChatMessageCollection(chatMessageCollection: ChatMessageCollection) {
    this._chatMessageCollection = chatMessageCollection;
    chatMessageCollection.setOwner(this);
  }
}
