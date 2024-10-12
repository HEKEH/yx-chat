import { Remind } from '@icon-park/vue-next';
import { ElBadge, ElTooltip } from 'element-plus';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { getGlobalStore } from '~/utils/vue';
import { MainMenu } from '~/domain/types';
import s from './style.module.sass';

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
      const { unread } = globalStore.notificationManager;
      return (
        <ElTooltip
          effect="dark"
          content={t('main.notifications')}
          placement="right"
        >
          <ElBadge value={unread} max={99} hidden={!unread} isDot>
            <Remind
              theme={isSelected ? 'filled' : 'outline'}
              class={[s.button, isSelected ? s['button-selected'] : undefined]}
              fill={
                isSelected
                  ? globalStore.themeManager.getThemeColor()
                  : undefined
              }
              strokeWidth={3}
              onClick={onClick}
            />
          </ElBadge>
        </ElTooltip>
      );
    };
  },
});
