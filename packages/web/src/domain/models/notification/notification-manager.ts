import { Notification, ServerMessageType } from '@yx-chat/shared/types';
import { Subscription } from 'rxjs';
import { SocketIO } from '~/infra/socket-io';
import { notificationFactory } from './notification-factory';
import { NotificationModel } from './typing';

export class NotificationManager {
  private _notificationListenSubscription: Subscription | undefined;
  private _notificationList: NotificationModel[] = [];

  get notificationList() {
    return this._notificationList;
  }

  get unread() {
    return this._notificationList.length;
  }

  private _receiveNotification(notification: Notification) {
    console.log(notification, 'notification');
    if (!this._notificationList.some(item => item.id === notification.id)) {
      this._notificationList.unshift(notificationFactory.create(notification));
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
    this._notificationList = notifications.map(notificationFactory.create);
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

  async removeNotification(notification: NotificationModel) {
    // remove from database
    await notification.remove();
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
