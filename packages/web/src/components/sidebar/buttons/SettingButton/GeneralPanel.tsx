import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import s from './style.module.sass';
import { LanguageSelect } from './LanguageSelect';

export const GeneralPanel = defineComponent({
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
