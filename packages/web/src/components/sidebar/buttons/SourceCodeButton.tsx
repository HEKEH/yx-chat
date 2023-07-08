import { GithubOne } from '@icon-park/vue-next';
import { ElTooltip } from 'element-plus';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import s from './style.module.sass';

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
          <GithubOne
            theme="outline"
            class={s.button}
            strokeWidth={3}
            onClick={openSourceCodePage}
          />
        </ElTooltip>
      );
    };
  },
});
