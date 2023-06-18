import { RegisterUserInfo } from '@yx-chat/types/account';
import platform from 'platform';
import { CommonResultStatus } from '~/types/common';
import { BaseService } from '../base/BaseService';

export class Register extends BaseService {
  async execute(userInfo: {
    username: string;
    password: string;
  }): Promise<CommonResultStatus> {
    const registerUserInfo: RegisterUserInfo = {
      username: userInfo.username,
      password: userInfo.password,
      /** 客户端系统 */
      os: platform.os?.family || '',
      /** 客户端浏览器 */
      browser: platform.name || '',
      /** 客户端环境信息 */
      environment: platform.description || '',
    };
    console.log(registerUserInfo, 'registerUserInfo');
    return {
      succeed: true,
    };
  }
}
