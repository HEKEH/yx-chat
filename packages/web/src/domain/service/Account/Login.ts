import { LoginSuccessResponse } from '@yx-chat/shared/types';
import { GlobalServiceModulesAPI } from '../GlobalServiceModulesAPI';
import { BaseService } from '../base/BaseService';
import { BusinessError } from '~/common/error';
import { SocketIO } from '~/infrastructure/socketIO';
import { LoginMessage } from '~/infrastructure/socketIO/message/send/LoginMessage';
import { LocalStorageStore } from '~/infrastructure/localStorage/localStorageStore';

export class Login extends BaseService<GlobalServiceModulesAPI> {
  async execute(userInfo: {
    username: string;
    password: string;
  }): Promise<void> {
    const res = await SocketIO.instance.fetch<LoginSuccessResponse | string>(
      new LoginMessage(userInfo),
    );
    // 和后端约定，返回string时，则为错误信息
    if (typeof res === 'string') {
      throw new BusinessError(res);
    }
    const { token, ...data } = res;
    LocalStorageStore.instance.setItem('token', token);
    this.context.services.account.loginUser.handleLoginSuccess(data);
  }
}
