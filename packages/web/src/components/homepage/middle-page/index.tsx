import { defineComponent } from 'vue';
import { getGlobalStore } from '~/utils/vue';
import { MainMenu } from '~/domain/types';
import { ContactTabs } from '~/components/contact';
import { ChatMessageCollectionList } from '~/components/chat/message-collection-list';
import s from './index.module.sass';

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
            <ChatMessageCollectionList
              chatMessageManager={globalStore.chatMessageManager}
            />
          )}
        </div>
      </div>
    );
  },
});
