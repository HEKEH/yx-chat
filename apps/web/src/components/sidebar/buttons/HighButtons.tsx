import { defineComponent } from 'vue';
import s from './style.module.sass';
import { ContactButton } from './ContactButton';
import { ChatButton } from './ChatButton';
import { NotificationButton } from './NotificationButton';

export const HighButtons = defineComponent({
  name: 'HighButtons',
  setup() {
    return () => (
      <div class={s.buttons}>
        <ChatButton />
        <ContactButton />
        <NotificationButton />
      </div>
    );
  },
});
