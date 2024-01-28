import { Notification, NotificationType } from '@yx-chat/shared/types';
import { NotificationModel } from './typing';
import { FriendAddNotificationModel } from './friend-add-notification';

export const notificationFactory = {
  create(notification: Notification): NotificationModel {
    switch (notification.type) {
      case NotificationType.FriendAddNotification:
        return new FriendAddNotificationModel(notification);
    }
  },
};
