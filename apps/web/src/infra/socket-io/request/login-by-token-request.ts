import {
  AccountRequestType,
  LoginByTokenRequestBody,
} from '@yx-chat/shared/types';
import platform from 'platform';
import { AbstractSocketRequest } from './type';

export class LoginByTokenRequest extends AbstractSocketRequest<LoginByTokenRequestBody> {
  private _token: string;
  get type() {
    return AccountRequestType.loginByToken;
  }
  get data() {
    return {
      token: this._token,
      /** 客户端系统 */
      os: platform.os?.family || '',
      /** 客户端浏览器 */
      browser: platform.name || '',
      /** 客户端环境信息 */
      environment: platform.description || '',
    };
  }
  get name() {
    return 'LoginByToken';
  }
  constructor(token: string) {
    super();
    this._token = token;
  }
}
