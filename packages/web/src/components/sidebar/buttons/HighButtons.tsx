import { defineComponent } from 'vue';
import s from './style.module.sass';
import { ContactButton } from './ContactButton';
import { MessageButton } from './MessageButton';

export const HighButtons = defineComponent({
  name: 'HighButtons',
  setup() {
    return () => (
      <div class={s.buttons}>
        <MessageButton />
        <ContactButton />
      </div>
    );
  },
});
