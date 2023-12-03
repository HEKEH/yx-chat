import {
  PropType,
  defineComponent,
  onBeforeUnmount,
  ref,
  watch,
  nextTick,
} from 'vue';
import { ChatMessageCollection } from '~/domain/models/chat/chat-message-collection';
import Self from '~/domain/models/self';
import { Subscription } from 'rxjs';
import s from './ChatItemList.module.sass';
import { ChatItem } from './chat-item';

export const ChatItemList = defineComponent({
  name: 'ChatItemList',
  props: {
    chatMessageCollection: {
      type: Object as PropType<ChatMessageCollection>,
      required: true,
    },
    self: {
      type: Object as PropType<Self>,
      required: true,
    },
  },
  setup(props) {
    const chatListViewRef = ref<HTMLDivElement | null>(null);
    const scrollChatListToBottom = async (
      isSmooth: boolean,
      immediate = false,
    ) => {
      if (!immediate) {
        await nextTick();
      }
      const listView = chatListViewRef.value;
      listView &&
        listView.scrollTo({
          top: listView.scrollHeight,
          behavior: isSmooth ? 'smooth' : undefined,
        });
    };
    const isFetchingByScroll = ref<boolean>(false);
    const handleScroll = async (e: UIEvent) => {
      if (isFetchingByScroll.value) {
        return;
      }
      const container = e.target as HTMLDivElement;
      if (
        container.scrollTop === 0 &&
        container.scrollHeight > container.clientHeight
      ) {
        isFetchingByScroll.value = true;
        try {
          const { scrollHeight: prevScrollHeight } = container;
          const hasFetchedNewData =
            await props.chatMessageCollection.fetchHistoryChatMessages();
          if (hasFetchedNewData) {
            await nextTick();
            container.scrollTo({
              top: container.scrollHeight - prevScrollHeight,
            }); // keep the position unchanged
          }
        } finally {
          isFetchingByScroll.value = false;
        }
      }
    };
    let scrollSubscription: Subscription | undefined;
    watch(
      () => props.chatMessageCollection,
      async value => {
        scrollSubscription?.unsubscribe();
        scrollSubscription = value.onHasNewChatMessage.subscribe(async () => {
          scrollChatListToBottom(true);
        });
        scrollChatListToBottom(false);
      },
      {
        immediate: true,
      },
    );
    onBeforeUnmount(() => scrollSubscription?.unsubscribe());
    return () => {
      const { chatMessageCollection } = props;
      if (!chatMessageCollection) {
        return null;
      }
      return (
        <div
          class={s.list}
          ref={ref => (chatListViewRef.value = ref as HTMLDivElement)}
          onScroll={handleScroll}
          v-loading={isFetchingByScroll.value ? 'loading' : undefined}
        >
          {chatMessageCollection.list.map(item => (
            <ChatItem key={item.id} value={item} self={props.self} />
          ))}
        </div>
      );
    };
  },
});
