import { MessageOne } from '@icon-park/vue-next';
import { ElTooltip } from 'element-plus';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import s from './style.module.sass';
import { getThemeColor } from '~/theme';
import { getServices } from '~/utils/vue';

export const MessageButton = defineComponent({
  name: 'MessageButton',
  setup() {
    const { t } = useI18n();
    const globalService = getServices().global;
    const onClick = () => {
      globalService.selectMenu('message');
    };
    return () => {
      const isSelected = globalService.state.selectedMenu === 'message';
      return (
        <ElTooltip
          effect="dark"
          content={t('common.message')}
          placement="right"
        >
          <MessageOne
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
