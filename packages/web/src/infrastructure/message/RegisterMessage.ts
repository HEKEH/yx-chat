import { RegisterData } from '@yx-chat/common/types/account';
import { MessageForSend } from './MessageForSend';
import { MessageTypeEnum } from './MessageTypeEnum';

export class RegisterMessage extends MessageForSend<RegisterData> {
  private _data: RegisterData;
  get type() {
    return MessageTypeEnum.register;
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
