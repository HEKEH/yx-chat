import { LoginSuccessResponse } from '@yx-chat/shared/types';
import { BaseService } from '../base/BaseService';
import { GlobalServiceModulesAPI } from '../GlobalServiceModulesAPI';
import { BusinessError } from '~/common/error';
import { LocalStorageStore } from '~/infrastructure/localStorage/localStorageStore';
import { SocketIO } from '~/infrastructure/socketIO';
import { LoginByTokenMessage } from '~/infrastructure/socketIO/message/send/LoginByTokenMessage';

export class LoginByToken extends BaseService<GlobalServiceModulesAPI> {
  async execute(): Promise<void> {
    const token = LocalStorageStore.instance.getItem<string | undefined>(
      'token',
    );
    if (!token) {
      return;
    }
    const res = await SocketIO.instance.fetch<LoginSuccessResponse | string>(
      new LoginByTokenMessage(token),
    );
    // 和后端约定，返回string时，则为错误信息
    if (typeof res === 'string') {
      throw new BusinessError(res);
    }
    this.context.services.account.loginUser.handleLoginSuccess(res);
  }
}
