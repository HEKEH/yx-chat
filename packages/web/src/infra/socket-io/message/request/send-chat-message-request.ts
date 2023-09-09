import {
  ChatMessageFormat,
  ChatMessageRequestType,
  SendChatMessageBody,
} from '@yx-chat/shared/types';
import { IContactUnit } from '~/domain/models/contact/typing';
import { AbstractSocketRequest } from './request';

export class SendChatMessageRequest extends AbstractSocketRequest<SendChatMessageBody> {
  readonly data: SendChatMessageBody;

  get type() {
    return ChatMessageRequestType.sendChatMessage;
  }

  get name() {
    return 'Send chat message';
  }
  constructor(props: {
    content: string;
    to: IContactUnit;
    type: ChatMessageFormat;
  }) {
    super();
    this.data = {
      content: props.content,
      to: props.to.messageOwnerKey,
      type: props.type,
    };
  }
}
