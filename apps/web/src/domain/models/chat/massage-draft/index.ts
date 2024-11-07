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
import { AudioDraftItem } from './audio-draft-item';

export type DraftItem =
  | TextDraftItem
  | ImageDraftItem
  | VideoDraftItem
  | AudioDraftItem
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

  splitTextItem(index: number, selectionStart: number, selectionEnd: number) {
    const item = this._items[index];
    if (item.type !== ChatMessageFormat.text) {
      throw new Error('The item must be a text item');
    }
    const content = item.content;
    const beforeSelection = content.slice(0, selectionStart);
    const afterSelection = content.slice(selectionEnd);
    item.setContent(beforeSelection);
    this._items.splice(index + 1, 0, new TextDraftItem(afterSelection));
  }

  insertFiles(files: File[], index: number) {
    if (!files.length) {
      return;
    }
    const newDraftItems: DraftItem[] = [];
    files.forEach((file, i) => {
      if (file.type.startsWith('image/')) {
        newDraftItems.push(new ImageDraftItem(file));
      } else if (file.type.startsWith('video/')) {
        newDraftItems.push(new VideoDraftItem(file));
      } else if (file.type.startsWith('audio/')) {
        newDraftItems.push(new AudioDraftItem(file));
      } else {
        newDraftItems.push(new FileDraftItem(file));
      }
      if (i !== files.length - 1) {
        newDraftItems.push(new TextDraftItem());
      }
    });
    if (this._items[index - 1].type !== ChatMessageFormat.text) {
      newDraftItems.unshift(new TextDraftItem());
    }
    if (
      index === this._items.length ||
      this._items[index].type !== ChatMessageFormat.text
    ) {
      newDraftItems.push(new TextDraftItem());
    }
    this._items.splice(index, 0, ...newDraftItems);
  }

  addFiles(files: File[]) {
    this.insertFiles(files, this._items.length);
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
