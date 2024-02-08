import { FriendAddNotification, NotificationType } from '@yx-chat/shared/types';
import { SocketIO } from '~/infra/socket-io';
import { RejectFriendAddRequest } from '~/infra/socket-io/request/reject-friend-add-request';
import { GeneralTime } from '../common/time';
import { NotificationModel } from './typing';

export class FriendAddNotificationModel implements NotificationModel {
  readonly id: string;
  readonly from: {
    id: string;
    username: string;
    avatar: string;
  };
  readonly createTime: GeneralTime;
  readonly message: string;
  readonly type = NotificationType.FriendAddNotification;
  constructor(notification: FriendAddNotification) {
    this.id = notification.id;
    this.from = notification.from;
    this.createTime = new GeneralTime(notification.createTime);
    this.message = notification.message;
  }
  async remove() {
    await SocketIO.instance.fetch(new RejectFriendAddRequest(this.id));
  }
}
