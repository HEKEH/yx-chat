import { defineComponent } from 'vue';
import s from './style.module.sass';
import { SourceCodeButton } from './SourceCodeButton';
import { SettingButton } from './SettingButton';
import { LogoutButton } from './LogoutButton';

export const LowButtons = defineComponent({
  name: 'LowButtons',
  setup() {
    return () => (
      <div class={s.buttons}>
        <SourceCodeButton />
        <SettingButton />
        <LogoutButton />
      </div>
    );
  },
});
