import { RegisterRequestBody } from '@yx-chat/shared/types';
import { AccountRequestType } from '@yx-chat/shared/types';
import platform from 'platform';
import { AbstractSocketRequest } from './request';
import i18n from '~/infra/i18n';

export class RegisterRequest extends AbstractSocketRequest<RegisterRequestBody> {
  private _userInfo: Pick<RegisterRequestBody, 'username' | 'password'>;
  get type() {
    return AccountRequestType.register;
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
  constructor(userInfo: Pick<RegisterRequestBody, 'username' | 'password'>) {
    super();
    this._userInfo = userInfo;
  }
}
