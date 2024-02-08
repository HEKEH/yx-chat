import { PropType, defineComponent } from 'vue';
import { NotificationManager } from '~/domain/models/notification/notification-manager';
import { useI18n } from 'vue-i18n';
import { NotificationModel } from '~/domain/models/notification/typing';
import { NotificationItem } from './NotificationItem';
import s from './index.module.sass';

export const NotificationList = defineComponent({
  name: 'NotificationList',
  props: {
    notificationManager: {
      type: Object as PropType<NotificationManager>,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const onRemoveNotification = async (item: NotificationModel) => {
      await props.notificationManager.removeNotification(item);
    };
    return () => {
      const { notificationManager } = props;
      const { notificationList } = notificationManager;
      if (!notificationList.length) {
        return (
          <div class={s['no-notification']}>{t('common.noNotification')}</div>
        );
      }
      return (
        <div class={s['notification-list']}>
          {notificationList.map(notificationModel => (
            <NotificationItem
              key={notificationModel.id}
              notificationModel={notificationModel}
              remove={onRemoveNotification}
            />
          ))}
        </div>
      );
    };
  },
});
