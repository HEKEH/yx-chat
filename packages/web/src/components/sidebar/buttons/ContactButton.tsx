import { People } from '@icon-park/vue-next';
import { ElTooltip } from 'element-plus';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { getGlobalStore } from '~/utils/vue';
import { MainMenu } from '~/domain/types';
import s from './style.module.sass';

export const ContactButton = defineComponent({
  name: 'ContactButton',
  setup() {
    const { t } = useI18n();
    const globalStore = getGlobalStore();
    const onClick = () => {
      globalStore.selectMenu(MainMenu.contact);
    };
    return () => {
      const isSelected = globalStore.selectedMenu === MainMenu.contact;
      return (
        <ElTooltip effect="dark" content={t('main.contacts')} placement="right">
          <People
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
