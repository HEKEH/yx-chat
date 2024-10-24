import { ChatMessageFormat } from '@yx-chat/shared/types';
import { ImageDraftItem } from './image-draft-item';
import { TextDraftItem } from './text-draft-item';
import { DraftContentType } from './types';

type DraftItem = TextDraftItem | ImageDraftItem;

export default class MessageDraft {
  private _items: DraftItem[] = [new TextDraftItem()];

  get items() {
    return this._items;
  }
  clear() {
    this._items = [new TextDraftItem()];
  }

  onFocus() {
    const item = this._items[this._items.length - 1];
    if (!(item instanceof TextDraftItem)) {
      // should not happen
      throw new Error('The last draft item must be a text item');
    }
    item.onFocus();
  }

  async save() {
    await Promise.all(this._items.map(item => item.save()));
  }

  private _contentType: ChatMessageFormat = ChatMessageFormat.text;

  private _content = '';

  get content() {
    return this._content;
  }
  setContent(draft: string) {
    this._content = draft;
  }

  get requestBody() {
    if (!this._content) {
      return;
    }
    return {
      content: this._content,
      type: this._contentType,
    };
  }
  addImage(file: File) {
    if (this._items[this._items.length - 1].type !== DraftContentType.Text) {
      // insert a text item before image
      this._items.push(new TextDraftItem());
    }
    this._items.push(new ImageDraftItem(file));
    // insert a text item after image
    this._items.push(new TextDraftItem());
  }
}
