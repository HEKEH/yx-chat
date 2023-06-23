import { ElOption, ElSelect } from 'element-plus';
import { defineComponent } from 'vue';
import s from './I18nSelect.module.sass';
import i18n, { I18N_OPTIONS, setI18nLanguage } from '~/infrastructure/i18n';

export const I18nSelect = defineComponent({
  setup() {
    return () => {
      return (
        <ElSelect
          modelValue={i18n.global.locale.value}
          onUpdate:modelValue={setI18nLanguage}
          class={s.select}
        >
          {I18N_OPTIONS.map(({ value, label }) => (
            <ElOption key={value} value={value} label={label} />
          ))}
        </ElSelect>
      );
    };
  },
});
