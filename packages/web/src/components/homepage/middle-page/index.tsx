import { defineComponent } from 'vue';
import s from './index.module.sass';
import { getGlobalStore } from '~/utils/vue';
import { MainMenu } from '~/domain/types';
import { ContactTabs } from '~/components/contact';
import { MessageList } from '~/components/message-list';

export const MiddlePage = defineComponent({
  name: 'MiddlePage',
  setup() {
    const globalStore = getGlobalStore();
    return () => (
      <div class={s['middle-page']}>
        <div class={s.header}></div>
        <div class={s.body}>
          {globalStore.selectedMenu === MainMenu.contact ? (
            <ContactTabs contactManager={globalStore.contactManager} />
          ) : (
            <MessageList />
          )}
        </div>
      </div>
    );
  },
});
