import { Subject } from 'rxjs';
import { getRandomId } from '@yx-chat/shared/utils';
import { DraftContentType } from './types';

export class TextDraftItem {
  readonly key = getRandomId();
  readonly focusSubject = new Subject<void>();
  readonly type = DraftContentType.Text;
  private _content = '';
  get shouldIgnore() {
    return !this._content.trim();
  }
  get content() {
    return this._content;
  }
  setContent(content: string) {
    this._content = content;
  }
  onFocus() {
    this.focusSubject.next();
  }
  async save() {
    // do nothing
  }
}
