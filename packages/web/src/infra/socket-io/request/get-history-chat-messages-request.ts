import {
  ChatMessageRequestType,
  HistoryChatMessagesRequestBody,
} from '@yx-chat/shared/types';
import { IContactUnit } from '~/domain/models/contact/typing';
import { AbstractSocketRequest } from './type';

export class GetHistoryChatMessagesRequest extends AbstractSocketRequest<HistoryChatMessagesRequestBody> {
  readonly data: HistoryChatMessagesRequestBody;

  get type() {
    return ChatMessageRequestType.getHistoryChatMessages;
  }

  get name() {
    return 'getHistoryChatMessages';
  }
  constructor(props: { contact: IContactUnit; offset: number }) {
    super();
    this.data = {
      contactKey: props.contact.messageOwnerKey,
      offset: props.offset,
    };
  }
}
