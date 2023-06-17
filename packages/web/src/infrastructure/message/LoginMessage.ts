import { MessageForSend } from './MessageForSend';
import { MessageTypeEnum } from './MessageTypeEnum';

export class LoginMessage extends MessageForSend {
  get type() {
    return MessageTypeEnum.login;
  }
  get data() {
    return {};
  }
  get name() {
    return '登录';
  }
}
