import { LoginSuccessResponse } from '@yx-chat/shared/types';
import { GlobalServiceModulesAPI } from '../global-service-modules-api';
import { BaseService } from '../base/base-service';
import { BusinessError } from '~/common/error';
import { SocketIO } from '~/infrastructure/socket-io';
import { LoginMessage } from '~/infrastructure/socket-io/message/send/login-message';
import { LocalStorageStore } from '~/infrastructure/local-store/local-storage-store';

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
    this.services.account.self.handleLoginSuccess(data);
  }
}
