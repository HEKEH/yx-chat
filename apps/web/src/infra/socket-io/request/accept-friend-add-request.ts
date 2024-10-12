import {
  AcceptFriendAddRequestBody,
  ContactRequestType,
} from '@yx-chat/shared/types';
import { AbstractSocketRequest } from './type';

export class AcceptFriendAddRequest extends AbstractSocketRequest<AcceptFriendAddRequestBody> {
  private _requestId: string;
  get type() {
    return ContactRequestType.acceptAddFriendRequest;
  }
  get data() {
    return {
      requestId: this._requestId,
    };
  }
  get name() {
    return 'Accept Friend Add Request';
  }
  constructor(requestId: string) {
    super();
    this._requestId = requestId;
  }
}
