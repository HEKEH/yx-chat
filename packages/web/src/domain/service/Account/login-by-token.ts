import { LoginSuccessResponse } from '@yx-chat/shared/types';
import { BaseService } from '../base/base-service';
import { GlobalServiceModulesAPI } from '../global-service-modules-api';
import { BusinessError } from '~/common/error';
import { LocalStorageStore } from '~/infrastructure/local-store/local-storage-store';
import { SocketIO } from '~/infrastructure/socket-io';
import { LoginByTokenMessage } from '~/infrastructure/socket-io/message/send/login-by-token-message';

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
    this.services.account.self.handleLoginSuccess(res);
  }
}
