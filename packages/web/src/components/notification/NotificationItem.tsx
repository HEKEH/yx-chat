import { PropType, defineComponent } from 'vue';
import { NotificationModel } from '~/domain/models/notification/typing';
import { NotificationType } from '@yx-chat/shared/types';
import { FriendAddNotificationModel } from '~/domain/models/notification/friend-add-notification';
import { FriendAddNotificationItem } from './FriendAddNotificationItem';
import s from './NotificationItem.module.sass';

export const NotificationItem = defineComponent({
  name: 'NotificationItem',
  props: {
    notificationModel: {
      type: Object as PropType<NotificationModel>,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const { notificationModel } = props;
      let content: JSX.Element;
      switch (notificationModel.type) {
        case NotificationType.FriendAddNotification:
          content = (
            <FriendAddNotificationItem
              model={notificationModel as FriendAddNotificationModel}
            />
          );
          break;
      }
      return <div class={s['notification-item-container']}>{content}</div>;
    };
  },
});
