import { RegisterData } from '@yx-chat/shared/types';
import { ClientMessageType } from '@yx-chat/shared/types';
import platform from 'platform';
import { MessageForSend } from './message-for-send';
import i18n from '~/infrastructure/i18n';

export class RegisterMessage extends MessageForSend<RegisterData> {
  private _userInfo: Pick<RegisterData, 'username' | 'password'>;
  get type() {
    return ClientMessageType.register;
  }
  get data() {
    return {
      ...this._userInfo,
      /** 客户端系统 */
      os: platform.os?.family || '',
      /** 客户端浏览器 */
      browser: platform.name || '',
      /** 客户端环境信息 */
      environment: platform.description || '',
    };
  }
  get name() {
    return i18n.global.t('account.register');
  }
  constructor(userInfo: Pick<RegisterData, 'username' | 'password'>) {
    super();
    this._userInfo = userInfo;
  }
}
