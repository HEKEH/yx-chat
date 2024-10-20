import { LANGUAGE } from '@yx-chat/shared/constants';
import { ElRadio, ElRadioGroup } from 'element-plus';
import { defineComponent } from 'vue';
import i18n, { I18N_OPTIONS, setI18nLanguage } from '~/infra/i18n';

export const LanguageSelect = defineComponent({
  name: 'LanguageSelect',
  setup() {
    return () => (
      <ElRadioGroup
        modelValue={i18n.global.locale.value}
        onUpdate:modelValue={v => {
          setI18nLanguage(v as LANGUAGE);
        }}
      >
        {I18N_OPTIONS.map(({ value, label }) => (
          <ElRadio key={value} label={value}>
            {label}
          </ElRadio>
        ))}
      </ElRadioGroup>
    );
  },
});
