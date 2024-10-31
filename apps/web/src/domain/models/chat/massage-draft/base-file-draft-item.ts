import { ChatMessageFormat, ChatMessageItem } from '@yx-chat/shared/types';
import { getRandomId } from '@yx-chat/shared/utils';
import config from '~/config';
import i18n from '~/infra/i18n';
import { IDraftItem } from './types';

export abstract class BaseFileDraftItem implements IDraftItem<File> {
  readonly key = getRandomId();
  private _content: File;

  uploadedFilename = '';

  get content() {
    return this._content;
  }
  constructor(file: File) {
    this._content = file;
  }
  setContent(file: File) {
    this._content = file;
    this.uploadedFilename = '';
  }

  get errorMsg() {
    if (
      config.uploadFileSizeLimit &&
      this._content.size > config.uploadFileSizeLimit * 1024 * 1024
    ) {
      return i18n.global.t('validate.fileSizeExceedsLimit', {
        limit: config.uploadFileSizeLimit,
      });
    }
  }

  abstract readonly type: ChatMessageFormat;
  abstract generateChatItem(): Promise<ChatMessageItem | undefined>;
}
