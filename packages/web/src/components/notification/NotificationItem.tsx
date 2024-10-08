import { PropType, defineComponent, ref } from 'vue';
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
    const contentRef = ref<any>(null);
    const onClick = () => {
      contentRef.value?.click();
    };
    return () => {
      const { notificationModel } = props;
      let content: any;
      switch (notificationModel.type) {
        case NotificationType.FriendAddNotification:
          content = (
            <FriendAddNotificationItem
              ref={contentRef}
              model={notificationModel as FriendAddNotificationModel}
            />
          );
          break;
      }
      return (
        <div class={s['notification-item-container']} onClick={onClick}>
          {content}
          <div class={s['create-time']}>
            {notificationModel.createTime.format()}
          </div>
        </div>
      );
    };
  },
});
