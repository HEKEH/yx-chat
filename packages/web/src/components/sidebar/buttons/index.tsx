import { defineComponent } from 'vue';
import s from './index.module.sass';
import { SourceCodeButton } from './SourceCodeButton';
import { LogoutButton } from './LogoutButton';

export const Buttons = defineComponent({
  setup() {
    return () => {
      return (
        <div class={s.buttons}>
          <SourceCodeButton class={s.button} />
          <LogoutButton class={s.button} />
        </div>
      );
    };
  },
});
