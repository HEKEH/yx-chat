import { Subject } from 'rxjs';
import { getRandomId } from '@yx-chat/shared/utils';
import { ChatMessageFormat, ChatMessageItem } from '@yx-chat/shared/types';

export class TextDraftItem {
  readonly key = getRandomId();
  readonly focusSubject = new Subject<void>();
  readonly type = ChatMessageFormat.text;
  private _content = '';
  get content() {
    return this._content;
  }
  get errorMsg() {
    // no error
    return undefined;
  }
  setContent(content: string) {
    this._content = content;
  }
  onFocus() {
    this.focusSubject.next();
  }
  generateChatItem(): ChatMessageItem | undefined {
    if (!this._content) {
      return;
    }
    return {
      data: this._content,
      type: this.type,
    };
  }
}
