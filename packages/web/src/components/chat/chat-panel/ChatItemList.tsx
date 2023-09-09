import {
  PropType,
  defineComponent,
  onUnmounted,
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
    onUnmounted(() => scrollSubscription?.unsubscribe());
    return () => {
      const { chatMessageCollection } = props;
      if (!chatMessageCollection) {
        return null;
      }
      return (
        <div
          class={s.list}
          ref={ref => (chatListViewRef.value = ref as HTMLDivElement)}
        >
          {chatMessageCollection.list.map(item => (
            <ChatItem key={item.id} value={item} self={props.self} />
          ))}
        </div>
      );
    };
  },
});
