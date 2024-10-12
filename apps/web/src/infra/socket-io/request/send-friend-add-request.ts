import {
  SendFriendAddRequestBody,
  ContactRequestType,
} from '@yx-chat/shared/types';
import { AbstractSocketRequest } from './type';

export class SendFriendAddRequest extends AbstractSocketRequest<SendFriendAddRequestBody> {
  private _targetUserId: string;
  get type() {
    return ContactRequestType.sendAddFriendRequest;
  }
  get data() {
    return {
      targetUserId: this._targetUserId,
    };
  }
  get name() {
    return 'Send Friend Add Request';
  }
  constructor(targetUserId: string) {
    super();
    this._targetUserId = targetUserId;
  }
}
