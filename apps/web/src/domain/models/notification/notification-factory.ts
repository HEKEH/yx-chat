import type { Notification } from '@yx-chat/shared/types';
import type { NotificationContext, NotificationModel } from './typing';
import { NotificationType } from '@yx-chat/shared/types';
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
