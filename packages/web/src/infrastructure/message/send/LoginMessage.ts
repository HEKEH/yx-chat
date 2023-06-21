import { ClientMessageType } from '@yx-chat/shared/types/message/ClientMessageType';
import { MessageForSend } from './MessageForSend';

export class LoginMessage extends MessageForSend {
  get type() {
    return ClientMessageType.login;
  }
  get data() {
    return {};
  }
  get name() {
    return '登录';
  }
}
