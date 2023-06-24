import { ClientMessageType, LoginData } from '@yx-chat/shared/types';
import platform from 'platform';
import { MessageForSend } from './MessageForSend';
import i18n from '~/infrastructure/i18n';

export class LoginMessage extends MessageForSend<LoginData> {
  private _userInfo: Pick<LoginData, 'username' | 'password'>;
  get type() {
    return ClientMessageType.login;
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
    return i18n.global.t('account.login');
  }
  constructor(userInfo: Pick<LoginData, 'username' | 'password'>) {
    super();
    this._userInfo = userInfo;
  }
}
