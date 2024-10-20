/** Info of the login user */

import { RESPONSE_CODE, UserBasicInfo } from '@yx-chat/shared/types';
import uploadFile from '~/infra/requests/upload-file';
import { UpdateAvatarRequest } from '~/infra/socket-io/request/update-avatar-request';
import { SocketIO } from '~/infra/socket-io';
import { IUser } from './typing';

export default class Self implements IUser {
  private _userInfo: UserBasicInfo | undefined;
  get userInfo() {
    return this._userInfo;
  }

  /** 已登录 */
  get hasLogged() {
    return Boolean(this._userInfo);
  }

  get id() {
    return this._userInfo?.id || '';
  }

  get name() {
    return this._userInfo?.username || '';
  }

  get avatar() {
    return this._userInfo?.avatar || '';
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  setUserInfo(userInfo: UserBasicInfo) {
    this._userInfo = userInfo;
  }

  async updateAvatar(file: File): Promise<{ success: boolean }> {
    const response = await uploadFile(file);
    if (response.status === RESPONSE_CODE.SUCCESS) {
      const { filename } = response.data;
      const request = new UpdateAvatarRequest({
        avatar: filename,
      });
      await SocketIO.instance.fetch<void>(request);
      this._userInfo!.avatar = filename;
      return { success: true };
    }
    return { success: false };
  }

  clear() {
    this._userInfo = undefined;
  }

  static createEmpty(): Self {
    return new Self();
  }
}
