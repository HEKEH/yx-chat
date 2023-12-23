import { defineComponent } from 'vue';
import { getGlobalStore } from '~/utils/vue';
import { MainMenu } from '~/domain/types';
import { ContactTabs } from '~/components/homepage/middle-page/contact-tabs';
import { ChatMessageCollectionList } from '~/components/homepage/middle-page/message-collection-list';
import { FunctionBar } from './function-bar';
import s from './index.module.sass';

export const MiddlePage = defineComponent({
  name: 'MiddlePage',
  setup() {
    const globalStore = getGlobalStore();
    return () => (
      <div class={s['middle-page']}>
        <div class={s.header}>
          <FunctionBar />
        </div>
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
