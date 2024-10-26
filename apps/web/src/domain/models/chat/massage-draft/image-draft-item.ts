import { ChatMessageFormat, ChatMessageItem } from '@yx-chat/shared/types';
import { getRandomId } from '@yx-chat/shared/utils';

export class ImageDraftItem {
  readonly key = getRandomId();
  readonly type = ChatMessageFormat.image;
  private _content: File | null = null;

  uploadedFilename = '';

  get content() {
    return this._content;
  }
  constructor(file: File) {
    this.setContent(file);
  }
  setContent(image: File) {
    this._content = image;
    this.uploadedFilename = '';
  }

  async generateChatItem(): Promise<ChatMessageItem | undefined> {
    if (!this._content) {
      return;
    }
    return {
      data: this.uploadedFilename,
      type: this.type,
    };
  }
}
