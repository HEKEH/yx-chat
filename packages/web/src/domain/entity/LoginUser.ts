/** 登录用户的个人信息 */

import { LoginSuccessResponse } from '@yx-chat/shared/types';
import { User } from '@yx-chat/shared/types';
import { LocalStorageStore } from '~/infrastructure/localStorage/localStorageStore';

export class LoginUser {
  private _userInfo: User | undefined;
  get userInfo() {
    return this._userInfo;
  }

  get isReady() {
    return Boolean(this._userInfo);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  handleLoginSuccess(loginSuccessResponse: LoginSuccessResponse) {
    console.log(loginSuccessResponse, 'loginSuccessResponse');
    const { token, friends, groups, ...userInfo } = loginSuccessResponse;
    LocalStorageStore.instance.setItem('token', token);
    this._userInfo = userInfo;
  }

  static createEmpty(): LoginUser {
    return new LoginUser();
  }
}
