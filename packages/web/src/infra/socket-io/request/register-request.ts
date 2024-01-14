import { RegisterRequestBody } from '@yx-chat/shared/types';
import { AccountRequestType } from '@yx-chat/shared/types';
import platform from 'platform';
import { AbstractSocketRequest } from './type';

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
    return 'Register';
  }
  constructor(userInfo: Pick<RegisterRequestBody, 'username' | 'password'>) {
    super();
    this._userInfo = userInfo;
  }
}
