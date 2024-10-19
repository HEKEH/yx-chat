import { ElTooltip } from 'element-plus';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { MainMenu } from '~/domain/types';
import { getGlobalStore } from '~/utils/vue';
import s from './style.module.sass';
import Contact from '@/assets/icons/contact.svg';

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
      const themeColor = 'var(--primary-color-10)';
      return (
        <ElTooltip effect="dark" content={t('main.contacts')} placement="right">
          <div
            class={[s.button, isSelected ? s['button-selected'] : undefined]}
            onClick={onClick}
          >
            <Contact
              fill={isSelected ? themeColor : 'none'}
              stroke={isSelected ? themeColor : 'currentColor'}
            />
          </div>
        </ElTooltip>
      );
    };
  },
});
