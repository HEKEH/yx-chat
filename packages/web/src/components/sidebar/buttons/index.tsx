import { defineComponent } from 'vue';
import s from './index.module.sass';
import { LogoutButton } from './LogoutButton';

export const Buttons = defineComponent({
  setup() {
    return () => {
      return (
        <div class={s.buttons}>
          <LogoutButton class={s.button} />
        </div>
      );
    };
  },
});
