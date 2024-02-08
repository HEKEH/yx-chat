import { Notification, NotificationType } from '@yx-chat/shared/types';
import { NotificationContext, NotificationModel } from './typing';
import { FriendAddNotificationModel } from './friend-add-notification';

export const notificationFactory = {
  create(
    context: NotificationContext,
    notification: Notification,
  ): NotificationModel {
    switch (notification.type) {
      case NotificationType.FriendAddNotification:
        return new FriendAddNotificationModel(context, notification);
    }
  },
};
