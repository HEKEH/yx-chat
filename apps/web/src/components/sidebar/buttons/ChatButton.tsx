import { ElTooltip } from 'element-plus';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { getGlobalStore } from '~/utils/vue';
import { MainMenu } from '~/domain/types';
import s from './style.module.sass';
import Message from '@/assets/icons/message.svg';

export const ChatButton = defineComponent({
  name: 'ChatButton',
  setup() {
    const { t } = useI18n();
    const globalStore = getGlobalStore();
    const onClick = () => {
      globalStore.selectMenu(MainMenu.message);
    };
    return () => {
      const isSelected = globalStore.selectedMenu === MainMenu.message;
      const themeColor = globalStore.themeManager.getThemeColor();
      return (
        <ElTooltip effect="dark" content={t('main.chats')} placement="right">
          <div
            class={[s.button, isSelected ? s['button-selected'] : undefined]}
            onClick={onClick}
          >
            <Message
              width={28}
              height={28}
              fill={isSelected ? themeColor : 'none'}
              stroke={isSelected ? themeColor : 'currentColor'}
              strokeWidth={3}
            />
          </div>
        </ElTooltip>
      );
    };
  },
});
