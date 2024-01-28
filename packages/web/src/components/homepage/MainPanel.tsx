import { defineComponent } from 'vue';
import { MainMenu } from '~/domain/types';
import { getGlobalStore } from '~/utils/vue';
import { ChatPanel } from '../chat/chat-panel';
import s from './index.module.sass';
import { MiddlePage } from './middle-page';
import { ContactTabs } from './middle-page/contact-tabs';
import { ChatMessageCollectionList } from './middle-page/message-collection-list';

export const MainPanel = defineComponent({
  name: 'MainPanel',
  setup() {
    const globalStore = getGlobalStore();
    return () => {
      switch (globalStore.selectedMenu) {
        case MainMenu.contact:
          return (
            <>
              <div class={s['middle-container']}>
                <MiddlePage>
                  <ContactTabs contactManager={globalStore.contactManager} />
                </MiddlePage>
              </div>
              <div class={s['right-container']}>
                <ChatPanel
                  chatMessageCollection={
                    globalStore.contactManager.currentContact
                      ?.chatMessageCollection
                  }
                  self={globalStore.self}
                />
              </div>
            </>
          );
        case MainMenu.message:
          return (
            <>
              <div class={s['middle-container']}>
                <MiddlePage>
                  <ChatMessageCollectionList
                    chatMessageManager={globalStore.chatMessageManager}
                  />
                </MiddlePage>
              </div>
              <div class={s['right-container']}>
                <ChatPanel
                  chatMessageCollection={
                    globalStore.chatMessageManager.selectedItem
                  }
                  self={globalStore.self}
                />
              </div>
            </>
          );
        case MainMenu.notification:
          return <div class={s['right-container']}></div>;
      }
    };
  },
});
