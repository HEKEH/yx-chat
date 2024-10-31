import { defineComponent } from 'vue';
import s from './style.module.sass';
import { SourceCodeButton } from './SourceCodeButton';
import { SettingButton } from './SettingButton';
import { LogoutButton } from './LogoutButton';
import { LanguageButton } from './LanguageButton';

export const LowButtons = defineComponent({
  name: 'LowButtons',
  setup() {
    return () => (
      <div class={s.buttons}>
        <LanguageButton />
        <SourceCodeButton />
        <SettingButton />
        <LogoutButton />
      </div>
    );
  },
});
