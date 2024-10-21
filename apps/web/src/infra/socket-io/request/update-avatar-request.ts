import {
  AccountRequestType,
  UpdateAvatarRequestBody,
} from '@yx-chat/shared/types';
import { AbstractSocketRequest } from './type';

type RequestBody = Pick<UpdateAvatarRequestBody, 'avatar'>;
export class UpdateAvatarRequest extends AbstractSocketRequest<RequestBody> {
  readonly data: RequestBody;

  get type() {
    return AccountRequestType.updateAvatar;
  }

  get name() {
    return 'Update avatar';
  }
  constructor(props: RequestBody) {
    super();
    this.data = props;
  }
}
