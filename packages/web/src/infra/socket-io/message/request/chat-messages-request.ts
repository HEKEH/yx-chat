import {
  ChatMessageRequestType,
  LastMessagesRequestBody,
} from '@yx-chat/shared/types';
import { AbstractSocketRequest } from './request';
import { IContactUnit } from '~/domain/models/contact/typing';

export class ChatMessagesRequest extends AbstractSocketRequest<LastMessagesRequestBody> {
  readonly data: LastMessagesRequestBody;

  get type() {
    return ChatMessageRequestType.getLastMessages;
  }

  get name() {
    return 'Get last messages';
  }
  constructor(props: { selfId: string; contacts: IContactUnit[] }) {
    super();
    this.data = {
      linkmans: props.contacts.map(item =>
        item.getMessageOwnerKey(props.selfId),
      ),
    };
  }
}
