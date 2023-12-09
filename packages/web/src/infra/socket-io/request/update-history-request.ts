import {
  ChatMessageRequestType,
  UpdateHistoryRequestBody,
} from '@yx-chat/shared/types';
import { AbstractSocketRequest } from './type';

export class UpdateHistoryRequest extends AbstractSocketRequest<UpdateHistoryRequestBody> {
  readonly data: UpdateHistoryRequestBody;

  get type() {
    return ChatMessageRequestType.updateHistory;
  }

  get name() {
    return 'Update history';
  }
  constructor(props: UpdateHistoryRequestBody) {
    super();
    this.data = props;
  }
}
