import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { LanguageSelect } from '../../../../components/LanguageSelect';
import s from './style.module.sass';

export const GeneralPanel = defineComponent({
  name: 'GeneralPanel',
  setup() {
    const { t } = useI18n();
    return () => {
      return (
        <div class={s.panel}>
          <div class={s.item}>
            <div class={s.title}>{t('common.language')}</div>
            <div class={s.content}>
              <LanguageSelect />
            </div>
          </div>
        </div>
      );
    };
  },
});
