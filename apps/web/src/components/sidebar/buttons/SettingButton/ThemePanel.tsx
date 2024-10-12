import { defineComponent } from 'vue';
import s from './style.module.sass';
import { ThemeSelect } from './ThemeSelect';

export const ThemePanel = defineComponent({
  name: 'ThemePanel',
  setup() {
    return () => {
      return (
        <div class={s.panel}>
          <div class={s.item}>
            <div class={s.content}>
              <ThemeSelect />
            </div>
          </div>
        </div>
      );
    };
  },
});
