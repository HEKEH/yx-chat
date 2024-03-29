import { AccountRequestType, LoginRequestBody } from '@yx-chat/shared/types';
import platform from 'platform';
import { AbstractSocketRequest } from './type';

export class LoginRequest extends AbstractSocketRequest<LoginRequestBody> {
  private _userInfo: Pick<LoginRequestBody, 'username' | 'password'>;
  get type() {
    return AccountRequestType.login;
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
    return 'Login';
  }
  constructor(userInfo: Pick<LoginRequestBody, 'username' | 'password'>) {
    super();
    this._userInfo = userInfo;
  }
}
