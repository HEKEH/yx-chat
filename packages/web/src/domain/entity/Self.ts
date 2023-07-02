/** Info of the login user */

import { LoginSuccessResponse } from '@yx-chat/shared/types';
import { User } from '@yx-chat/shared/types';

export class Self {
  private _userInfo: User | undefined;
  get userInfo() {
    return this._userInfo;
  }

  /** 已登录 */
  get hasLogged() {
    return Boolean(this._userInfo);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  handleLoginSuccess(
    loginSuccessResponse: Omit<LoginSuccessResponse, 'token'>,
  ) {
    const { friends, groups, ...userInfo } = loginSuccessResponse;
    this._userInfo = userInfo;
  }

  clear() {
    this._userInfo = undefined;
  }

  static createEmpty(): Self {
    return new Self();
  }
}
