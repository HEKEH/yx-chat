import {
  ChatMessageItem,
  ChatMessageRequestType,
  SendChatMessageBody,
} from '@yx-chat/shared/types';
import { IContactUnit } from '~/domain/models/contact/typing';
import { AbstractSocketRequest } from './type';

export class SendChatMessageRequest extends AbstractSocketRequest<SendChatMessageBody> {
  readonly data: SendChatMessageBody;

  get type() {
    return ChatMessageRequestType.sendChatMessage;
  }

  get name() {
    return 'Send chat message';
  }
  constructor(props: { to: IContactUnit; items: ChatMessageItem[] }) {
    super();
    this.data = {
      to: props.to.messageOwnerKey,
      items: props.items,
    };
  }
}
