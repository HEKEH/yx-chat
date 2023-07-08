import { ElRadio, ElRadioGroup } from 'element-plus';
import { defineComponent } from 'vue';
import { Locale } from '@yx-chat/i18n/types';
import i18n, { I18N_OPTIONS, setI18nLanguage } from '~/infrastructure/i18n';

export const LanguageSelect = defineComponent({
  name: 'LanguageSelect',
  setup() {
    return () => (
      <ElRadioGroup
        modelValue={i18n.global.locale.value}
        onUpdate:modelValue={v => {
          setI18nLanguage(v as Locale);
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
