import { People } from '@icon-park/vue-next';
import { ElTooltip } from 'element-plus';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import s from './style.module.sass';
import { getThemeColor } from '~/theme';
import { getServices } from '~/utils/vue';

export const ContactButton = defineComponent({
  name: 'ContactButton',
  setup() {
    const { t } = useI18n();
    const globalService = getServices().global;
    const onClick = () => {
      globalService.selectMenu('contact');
    };
    return () => {
      const isSelected = globalService.state.selectedMenu === 'contact';
      return (
        <ElTooltip
          effect="dark"
          content={t('common.contact')}
          placement="right"
        >
          <People
            theme={isSelected ? 'filled' : 'outline'}
            class={[s.button, isSelected ? s['button-selected'] : undefined]}
            fill={isSelected ? getThemeColor() : undefined}
            strokeWidth={3}
            onClick={onClick}
          />
        </ElTooltip>
      );
    };
  },
});
