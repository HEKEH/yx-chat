import {
  ContactRequestType,
  CreateGroupRequestBody,
} from '@yx-chat/shared/types';
import { AbstractSocketRequest } from './type';

export class CreateGroupRequest extends AbstractSocketRequest<CreateGroupRequestBody> {
  private _groupName: string;
  get type() {
    return ContactRequestType.createGroup;
  }
  get data() {
    return {
      name: this._groupName,
    };
  }
  get name() {
    return 'Create Group';
  }
  constructor(groupName: string) {
    super();
    this._groupName = groupName;
  }
}
