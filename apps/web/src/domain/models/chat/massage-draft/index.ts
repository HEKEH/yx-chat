import {
  ChatMessageFormat,
  ChatMessageItem,
  RESPONSE_CODE,
} from '@yx-chat/shared/types';
import uploadFiles from '~/infra/requests/upload-files';
import { ImageDraftItem } from './image-draft-item';
import { TextDraftItem } from './text-draft-item';

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

  async generateChatItems(): Promise<ChatMessageItem[] | undefined> {
    const draftWithFileItems = this._items.filter(
      item => item.content instanceof File,
    ) as ImageDraftItem[];
    const uploadResult = await uploadFiles(
      draftWithFileItems.map(item => item.content as File),
    );
    if (uploadResult.status !== RESPONSE_CODE.SUCCESS) {
      return;
    }
    const { filenames } = uploadResult.data;
    draftWithFileItems.forEach((item, index) => {
      item.uploadedFilename = filenames[index];
    });
    return (
      await Promise.all(this._items.map(item => item.generateChatItem()))
    ).filter(item => item) as ChatMessageItem[];
  }

  /** if the last item is text, combine it with the previous text item */
  private _removeAbundantTextItem() {
    for (let i = this._items.length - 1; i >= 1; i--) {
      const currentItem = this._items[i];
      const previousItem = this._items[i - 1];
      if (
        currentItem.type === ChatMessageFormat.text &&
        previousItem.type === ChatMessageFormat.text
      ) {
        const content = previousItem.content + '\n' + currentItem.content;
        previousItem.setContent(content);
        this._items.splice(i, 1);
      }
    }
  }

  addImage(file: File) {
    if (this._items[this._items.length - 1].type !== ChatMessageFormat.text) {
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
