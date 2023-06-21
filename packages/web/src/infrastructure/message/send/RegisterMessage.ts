import { RegisterData } from '@yx-chat/shared/types/account';
import { ClientMessageType } from '@yx-chat/shared/types/message/ClientMessageType';
import { MessageForSend } from './MessageForSend';

export class RegisterMessage extends MessageForSend<RegisterData> {
  private _data: RegisterData;
  get type() {
    return ClientMessageType.register;
  }
  get data() {
    return this._data;
  }
  get name() {
    return '注册';
  }
  constructor(data: RegisterData) {
    super();
    this._data = data;
  }
}
