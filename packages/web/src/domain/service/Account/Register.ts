import { LoginSuccessResponse } from '@yx-chat/shared/types';
import { GlobalServiceModulesAPI } from '../GlobalServiceModulesAPI';
import { BaseService } from '../base/BaseService';
import { BusinessError } from '~/common/error';
import { SocketIO } from '~/infrastructure/socketIO/SocketIO';
import { RegisterMessage } from '~/infrastructure/socketIO/message/send/RegisterMessage';
import { LocalStorageStore } from '~/infrastructure/localStorage/localStorageStore';

export class Register extends BaseService<GlobalServiceModulesAPI> {
  async execute(userInfo: {
    username: string;
    password: string;
  }): Promise<void> {
    const res = await SocketIO.instance.fetch<LoginSuccessResponse | string>(
      new RegisterMessage(userInfo),
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
