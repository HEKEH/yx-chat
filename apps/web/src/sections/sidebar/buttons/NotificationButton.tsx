import { ElBadge, ElTooltip } from 'element-plus';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { getGlobalStore } from '~/utils/vue';
import { MainMenu } from '~/domain/types';
import s from './style.module.sass';
import Notification from '@/assets/icons/notification.svg';

export const NotificationButton = defineComponent({
  name: 'NotificationButton',
  setup() {
    const { t } = useI18n();
    const globalStore = getGlobalStore();
    const onClick = () => {
      globalStore.selectMenu(MainMenu.notification);
    };
    return () => {
      const isSelected = globalStore.selectedMenu === MainMenu.notification;
      const themeColor = 'var(--primary-color-10)';
      const { unread } = globalStore.notificationManager;
      return (
        <ElTooltip
          effect="dark"
          content={t('main.notifications')}
          placement="right"
        >
          <ElBadge value={unread} max={99} hidden={!unread} isDot>
            <div
              class={[s.button, isSelected ? s['button-selected'] : undefined]}
              onClick={onClick}
            >
              <Notification
                fill={isSelected ? themeColor : 'none'}
                stroke={isSelected ? themeColor : 'currentColor'}
              />
            </div>
          </ElBadge>
        </ElTooltip>
      );
    };
  },
});
