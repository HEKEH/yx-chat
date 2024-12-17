/** Info of the login user */

import type { UserBasicInfo } from '@yx-chat/shared/types';
import type { IUser } from './typing';
import { RESPONSE_CODE } from '@yx-chat/shared/types';
import uploadFile from '~/infra/requests/upload-file';
import { SocketIO } from '~/infra/socket-io';
import { UpdateUserInfoRequest } from '~/infra/socket-io/request/update-user-info-request';

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

  private constructor() {}

  setUserInfo(userInfo: UserBasicInfo) {
    this._userInfo = userInfo;
  }

  async updateAvatar(file: File): Promise<{ success: boolean }> {
    const response = await uploadFile(file);
    if (response.status === RESPONSE_CODE.SUCCESS) {
      const { filename } = response.data;
      const request = new UpdateUserInfoRequest({
        avatar: filename,
      });
      await SocketIO.instance.fetch<void>(request);
      this._userInfo!.avatar = filename;
      return { success: true };
    }
    return { success: false };
  }

  async updateUsername(newUsername: string): Promise<{ success: boolean }> {
    const request = new UpdateUserInfoRequest({
      username: newUsername,
    });
    await SocketIO.instance.fetch<void>(request);
    this._userInfo!.username = newUsername;
    return { success: true };
  }

  async updatePassword(newPassword: string): Promise<{ success: boolean }> {
    const request = new UpdateUserInfoRequest({
      password: newPassword,
    });
    await SocketIO.instance.fetch<void>(request);
    return { success: true };
  }

  clear() {
    this._userInfo = undefined;
  }

  static createEmpty(): Self {
    return new Self();
  }
}
