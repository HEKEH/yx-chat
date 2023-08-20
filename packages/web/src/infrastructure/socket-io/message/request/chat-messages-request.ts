import {
  ChatMessageRequestType,
  LastMessagesRequestBody,
} from '@yx-chat/shared/types';
import { AbstractSocketRequest } from './request';
import { FriendModel } from '~/domain/models/contact/friend';
import { GroupModel } from '~/domain/models/contact/group';

export class ChatMessagesRequest extends AbstractSocketRequest<LastMessagesRequestBody> {
  readonly data: LastMessagesRequestBody;

  get type() {
    return ChatMessageRequestType.getLastMessages;
  }

  get name() {
    return 'Get last messages';
  }
  constructor(props: {
    selfId: string;
    groups: GroupModel[];
    friends: FriendModel[];
  }) {
    super();
    this.data = {
      linkmans: [
        ...props.groups.map(group => group.id),
        ...props.friends.map(friend =>
          friend.getMessageRequestKey(props.selfId),
        ),
      ],
    };
  }
}
