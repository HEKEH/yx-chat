import { ChatMessageFormat, ChatMessageItem } from '@yx-chat/shared/types';
import { getRandomId } from '@yx-chat/shared/utils';
import config from '~/config';
import i18n from '~/infra/i18n';

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

  get errorMsg() {
    if (!this._content) {
      return undefined;
    }
    if (
      config.uploadFileSizeLimit &&
      this._content.size > config.uploadFileSizeLimit * 1024 * 1024
    ) {
      return i18n.global.t('validate.fileSizeExceedsLimit', {
        limit: config.uploadFileSizeLimit,
      });
    }
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
