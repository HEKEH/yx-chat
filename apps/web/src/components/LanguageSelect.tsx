import { LANGUAGE } from '@yx-chat/shared/constants';
import { ElRadio, ElRadioGroup } from 'element-plus';
import { defineComponent, PropType } from 'vue';
import i18n, { I18N_OPTIONS, setI18nLanguage } from '~/infra/i18n';
import s from './LanguageSelect.module.sass';

export const LanguageSelect = defineComponent({
  name: 'LanguageSelect',
  props: {
    direction: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal',
    },
  },
  emits: {
    select: (value: LANGUAGE) => true,
  },
  setup(props, { emit }) {
    return () => (
      <ElRadioGroup
        modelValue={i18n.global.locale.value}
        onUpdate:modelValue={v => {
          setI18nLanguage(v as LANGUAGE);
          emit('select', v as LANGUAGE);
        }}
        class={{
          [s['language-select-vertical']]: props.direction === 'vertical',
        }}
      >
        {I18N_OPTIONS.map(({ value, label }) => (
          <ElRadio key={value} label={value} value={value}>
            {label}
          </ElRadio>
        ))}
      </ElRadioGroup>
    );
  },
});
