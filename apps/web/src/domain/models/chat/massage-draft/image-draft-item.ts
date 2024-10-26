import { ChatMessageFormat, ChatMessageItem } from '@yx-chat/shared/types';
import { getRandomId } from '@yx-chat/shared/utils';

export class ImageDraftItem {
  readonly key = getRandomId();
  readonly type = ChatMessageFormat.image;
  private _content: File | null = null;

  private _uploadedFilename = '';

  get content() {
    return this._content;
  }
  constructor(file: File) {
    this.setContent(file);
  }
  setContent(image: File) {
    this._content = image;
    this._uploadedFilename = '';
  }

  async generateChatItem(): Promise<ChatMessageItem | undefined> {
    if (!this._content) {
      return;
    }
    if (!this._uploadedFilename) {
      await this._save();
      // TODO
      return;
    }
    return {
      data: this._uploadedFilename,
      type: this.type,
    };
  }

  private async _save() {
    // TODO: upload image
  }
}
