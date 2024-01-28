import { FriendAddNotification, NotificationType } from '@yx-chat/shared/types';
import { GeneralTime } from '../common/time';

export class FriendAddNotificationModel {
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
}
