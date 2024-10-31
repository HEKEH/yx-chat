import { ChatMessageFormat, ChatMessageItem } from '@yx-chat/shared/types';
import { BaseFileDraftItem } from './base-file-draft-item';

export class VideoDraftItem extends BaseFileDraftItem {
  readonly type = ChatMessageFormat.video;

  constructor(file: File) {
    super(file);
  }
  async generateChatItem(): Promise<ChatMessageItem | undefined> {
    if (!this.uploadedFilename) {
      return;
    }
    return {
      data: this.uploadedFilename,
      type: this.type,
    };
  }
}
