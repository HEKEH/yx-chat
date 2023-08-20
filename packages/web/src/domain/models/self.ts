/** Info of the login user */

import { User } from '@yx-chat/shared/types';
import { ContactUnit } from './contact/typing';

export default class Self implements ContactUnit {
  private _userInfo: User | undefined;
  get userInfo() {
    return this._userInfo;
  }

  /** 已登录 */
  get hasLogged() {
    return Boolean(this._userInfo);
  }

  get id() {
    return this._userInfo?._id || '';
  }

  get name() {
    return this._userInfo?.username || '';
  }

  get avatar() {
    return this._userInfo?.avatar || '';
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  setUserInfo(userInfo: User) {
    this._userInfo = userInfo;
  }

  clear() {
    this._userInfo = undefined;
  }

  static createEmpty(): Self {
    return new Self();
  }
}
