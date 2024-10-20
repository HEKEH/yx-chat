import { ElTooltip } from 'element-plus';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import s from './style.module.sass';
import Github from '@/assets/icons/github.svg';

export const SourceCodeButton = defineComponent({
  name: 'SourceCodeButton',
  setup() {
    const { t } = useI18n();
    const openSourceCodePage = () => {
      window.open('https://github.com/HEKEH/yx-chat', '_blank');
    };
    return () => {
      return (
        <ElTooltip
          effect="dark"
          content={t('common.sourceCode')}
          placement="right"
        >
          <div class={s.button} onClick={openSourceCodePage}>
            <Github />
          </div>
        </ElTooltip>
      );
    };
  },
});
