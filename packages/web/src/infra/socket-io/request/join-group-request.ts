import {
  ContactRequestType,
  JoinGroupRequestBody,
} from '@yx-chat/shared/types';
import { AbstractSocketRequest } from './type';

export class JoinGroupRequest extends AbstractSocketRequest<JoinGroupRequestBody> {
  private _groupId: string;
  get type() {
    return ContactRequestType.joinGroup;
  }
  get data() {
    return {
      groupId: this._groupId,
    };
  }
  get name() {
    return 'Join Group';
  }
  constructor(groupId: string) {
    super();
    this._groupId = groupId;
  }
}
