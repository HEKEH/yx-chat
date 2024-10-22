import {
  AccountRequestType,
  UpdateUserInfoRequestBody,
} from '@yx-chat/shared/types';
import { AbstractSocketRequest } from './type';

type RequestBody = Omit<UpdateUserInfoRequestBody, 'token'>;
export class UpdateUserInfoRequest extends AbstractSocketRequest<RequestBody> {
  readonly data: RequestBody;

  get type() {
    return AccountRequestType.updateUserInfo;
  }

  get name() {
    return 'Update user info';
  }
  constructor(props: RequestBody) {
    super();
    this.data = props;
  }
}
