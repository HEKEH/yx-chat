import {
  LoginSuccessResponse,
  RegisterData,
} from '@yx-chat/shared/types/account';
import platform from 'platform';
import { BusinessError } from '~/common/error';
import { RegisterMessage } from '~/infrastructure/message/RegisterMessage';
import { SocketIO } from '~/infrastructure/socketIO/SocketIO';
import { BaseService } from '../base/BaseService';
import { GlobalServiceModulesAPI } from '../GlobalServiceModulesAPI';

export class Register extends BaseService<GlobalServiceModulesAPI> {
  async execute(userInfo: {
    username: string;
    password: string;
  }): Promise<void> {
    const registerUserInfo: RegisterData = {
      username: userInfo.username,
      password: userInfo.password,
      /** 客户端系统 */
      os: platform.os?.family || '',
      /** 客户端浏览器 */
      browser: platform.name || '',
      /** 客户端环境信息 */
      environment: platform.description || '',
    };
    const res = await SocketIO.instance.fetch<LoginSuccessResponse | string>(
      new RegisterMessage(registerUserInfo),
    );
    // 和后端约定，返回string时，则为错误信息
    if (typeof res === 'string') {
      throw new BusinessError(res);
    }
    this.context.services.account.loginUser.handleLoginSuccess(res);
  }
}
