import type { Notification } from '@yx-chat/shared/types';
import type { Subscription } from 'rxjs';
import type { NotificationContext, NotificationModel } from './typing';
import { ServerMessageType } from '@yx-chat/shared/types';
import { SocketIO } from '~/infra/socket-io';
import { notificationFactory } from './notification-factory';

export class NotificationManager implements NotificationContext {
  private _notificationListenSubscription: Subscription | undefined;
  private _notificationList: NotificationModel[] = [];

  get notificationList() {
    return this._notificationList;
  }

  get unread() {
    return this._notificationList.length;
  }

  private _receiveNotification(notification: Notification) {
    if (!this._notificationList.some(item => item.id === notification.id)) {
      this._notificationList.unshift(
        notificationFactory.create(this, notification),
      );
      this._sortItems();
    }
  }

  private _sortItems() {
    this._notificationList.sort((a, b) => {
      const timeA = a.createTime;
      const timeB = b.createTime;
      if (timeA.isSame(timeB)) {
        return 0;
      }
      return timeA.isBefore(timeB) ? -1 : 1;
    });
  }

  init(notifications: Notification[]) {
    this._notificationList = notifications.map(notification =>
      notificationFactory.create(this, notification),
    );
    this._sortItems();
    this._notificationListenSubscription =
      SocketIO.instance.addMessageListener<{
        type: ServerMessageType.notification;
        data: Notification;
      }>(ServerMessageType.notification, (notification: Notification) => {
        this._receiveNotification(notification);
      });
  }

  addItem(notification: Notification) {
    this._receiveNotification(notification);
  }

  removeNotification(notification: NotificationModel) {
    this._notificationList = this._notificationList.filter(
      item => item.id !== notification.id,
    );
  }

  clear() {
    this._notificationList = [];
    this._notificationListenSubscription!.unsubscribe();
    this._notificationListenSubscription = undefined;
  }
}
