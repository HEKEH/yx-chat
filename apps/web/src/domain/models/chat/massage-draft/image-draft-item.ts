import { getRandomId } from '@yx-chat/shared/utils';
import { DraftContentType } from './types';

export class ImageDraftItem {
  readonly key = getRandomId();
  readonly type = DraftContentType.Image;
  private _content: File | null = null;

  get shouldIgnore() {
    return !this._content;
  }
  get content() {
    return this._content;
  }
  constructor(file: File) {
    this.setContent(file);
  }
  setContent(image: File) {
    this._content = image;
  }

  async save() {
    // TODO: upload image
  }
}
