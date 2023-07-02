import { ElRadio, ElRadioGroup } from 'element-plus';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { ThemeName, getTheme, setTheme } from '~/theme';

export const ThemeSelect = defineComponent({
  setup() {
    const { t } = useI18n();
    return () => {
      const THEME_OPTIONS: {
        value: ThemeName;
        label: string;
      }[] = [
        { value: 'default', label: t('style.theme.default') },
        { value: 'cool', label: t('style.theme.cool') },
      ];
      return (
        <ElRadioGroup
          modelValue={getTheme()}
          onUpdate:modelValue={v => {
            setTheme(v as ThemeName);
          }}
        >
          {THEME_OPTIONS.map(({ value, label }) => (
            <ElRadio key={value} label={value}>
              {label}
            </ElRadio>
          ))}
        </ElRadioGroup>
      );
    };
  },
});
