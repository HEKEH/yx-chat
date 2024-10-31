import {
  ChatMessageFormat,
  ChatMessageItem,
  RESPONSE_CODE,
} from '@yx-chat/shared/types';
import uploadFiles from '~/infra/requests/upload-files';
import config from '~/config';
import i18n from '~/infra/i18n';
import { ImageDraftItem } from './image-draft-item';
import { TextDraftItem } from './text-draft-item';
import { VideoDraftItem } from './video-draft-item';
import { FileDraftItem } from './file-draft-item';

export type DraftItem =
  | TextDraftItem
  | ImageDraftItem
  | VideoDraftItem
  | FileDraftItem;

export default class MessageDraft {
  private _items: DraftItem[] = [new TextDraftItem()];

  get items() {
    return this._items;
  }
  clear() {
    this._items = [new TextDraftItem()];
  }

  get globalErrorMsg() {
    if (config.maxMessageLength) {
      let maxTextLength = 0;
      for (const item of this._items) {
        if (item.type === ChatMessageFormat.text) {
          maxTextLength += item.content.length;
        }
      }
      if (maxTextLength > config.maxMessageLength) {
        return i18n.global.t('validate.messageLengthExceedsLimit', {
          limit: config.maxMessageLength,
        });
      }
    }
  }

  get hasError() {
    return Boolean(
      this.globalErrorMsg || this._items.some(item => item.errorMsg),
    );
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
    if (!this._items.length) {
      return;
    }
    const draftWithFileItems = this._items.filter(
      item => item.content instanceof File,
    ) as ImageDraftItem[];
    if (draftWithFileItems.length) {
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
    }
    return (
      await Promise.all(this._items.map(item => item.generateChatItem()))
    ).filter(item => item) as ChatMessageItem[];
  }

  /** if the last item is text, combine it with the previous text item */
  private _removeAbundantTextItem(
    startIndex = 0,
    endIndex = this._items.length - 1,
  ) {
    for (let i = endIndex; i > startIndex; i--) {
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

  addFile(file: File) {
    if (this._items[this._items.length - 1].type !== ChatMessageFormat.text) {
      // insert a text item before image
      this._items.push(new TextDraftItem());
    }
    if (file.type.startsWith('image/')) {
      this._items.push(new ImageDraftItem(file));
    } else if (file.type.startsWith('video/')) {
      this._items.push(new VideoDraftItem(file));
    } else {
      this._items.push(new FileDraftItem(file));
    }
    // insert a text item after image
    this._items.push(new TextDraftItem());
  }

  removeItem(item: DraftItem) {
    const index = this._items.indexOf(item);
    if (index > -1) {
      this._items.splice(index, 1);
      const nextItem = this._items[index];
      if (nextItem?.type === ChatMessageFormat.text) {
        if (!nextItem.content) {
          this._items.splice(index, 1);
        } else {
          this._removeAbundantTextItem(index - 1, index);
        }
      }
    }
  }
}
