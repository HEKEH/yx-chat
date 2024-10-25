import { ChatMessageFormat } from '@yx-chat/shared/types';
import { ImageDraftItem } from './image-draft-item';
import { TextDraftItem } from './text-draft-item';
import { DraftContentType } from './types';

export type DraftItem = TextDraftItem | ImageDraftItem;

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

  /** if the last item is text, combine it with the previous text item */
  private _removeAbundantTextItem() {
    for (let i = this._items.length - 1; i >= 1; i--) {
      const currentItem = this._items[i];
      const previousItem = this._items[i - 1];
      if (
        currentItem.type === DraftContentType.Text &&
        previousItem.type === DraftContentType.Text
      ) {
        const content = previousItem.content + '\n' + currentItem.content;
        previousItem.setContent(content);
        this._items.splice(i, 1);
      }
    }
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

  removeItem(item: DraftItem) {
    this._items = this._items.filter(i => i !== item);
    this._removeAbundantTextItem();
  }
}
