import {
  ContactRequestType,
  RejectFriendAddRequestBody,
} from '@yx-chat/shared/types';
import { AbstractSocketRequest } from './type';

export class RejectFriendAddRequest extends AbstractSocketRequest<RejectFriendAddRequestBody> {
  private _requestId: string;
  get type() {
    return ContactRequestType.rejectAddFriendRequest;
  }
  get data() {
    return {
      requestId: this._requestId,
    };
  }
  get name() {
    return 'Reject Friend Add Request';
  }
  constructor(requestId: string) {
    super();
    this._requestId = requestId;
  }
}
