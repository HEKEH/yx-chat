import {
  AcceptFriendAddRequestResponse,
  FriendAddNotification,
  NotificationType,
} from '@yx-chat/shared/types';
import { SocketIO } from '~/infra/socket-io';
import { AcceptFriendAddRequest } from '~/infra/socket-io/request/accept-friend-add-request';
import { RejectFriendAddRequest } from '~/infra/socket-io/request/reject-friend-add-request';
import { GeneralTime } from '../common/time';
import { NotificationContext, NotificationModel } from './typing';

export class FriendAddNotificationModel implements NotificationModel {
  private _context: NotificationContext;
  readonly id: string;
  readonly from: {
    id: string;
    username: string;
    avatar: string;
  };
  readonly createTime: GeneralTime;
  readonly message: string;
  readonly type = NotificationType.FriendAddNotification;
  constructor(
    context: NotificationContext,
    notification: FriendAddNotification,
  ) {
    this._context = context;
    this.id = notification.id;
    this.from = notification.from;
    this.createTime = new GeneralTime(notification.createTime);
    this.message = notification.message;
  }
  async remove() {
    await SocketIO.instance.fetch(new RejectFriendAddRequest(this.id));
    this._context.removeNotification(this);
  }
  async accept() {
    const res = await SocketIO.instance.fetch<AcceptFriendAddRequestResponse>(
      new AcceptFriendAddRequest(this.id),
    );
    this._context.removeNotification(this);
    return res;
  }
}
