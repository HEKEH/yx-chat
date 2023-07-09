import { MessageOne } from '@icon-park/vue-next';
import { ElTooltip } from 'element-plus';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import s from './style.module.sass';
import { getGlobalStore } from '~/utils/vue';
import { MainMenu } from '~/domain/types';

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
      return (
        <ElTooltip effect="dark" content={t('main.chats')} placement="right">
          <MessageOne
            theme={isSelected ? 'filled' : 'outline'}
            class={[s.button, isSelected ? s['button-selected'] : undefined]}
            fill={
              isSelected ? globalStore.themeManager.getThemeColor() : undefined
            }
            strokeWidth={3}
            onClick={onClick}
          />
        </ElTooltip>
      );
    };
  },
});
