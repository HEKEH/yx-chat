import {
  ChatMessageRequestType,
  LastMessagesRequestBody,
} from '@yx-chat/shared/types';
import { IContactUnit } from '~/domain/models/contact/typing';
import { AbstractSocketRequest } from './type';

export class GetChatMessagesRequest extends AbstractSocketRequest<LastMessagesRequestBody> {
  readonly data: LastMessagesRequestBody;

  get type() {
    return ChatMessageRequestType.getLastChatMessages;
  }

  get name() {
    return 'GetLastMessages';
  }
  constructor(props: { selfId: string; contacts: IContactUnit[] }) {
    super();
    this.data = {
      contactKeys: props.contacts.map(item => item.messageOwnerKey),
    };
  }
}
