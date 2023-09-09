import { PropType, defineComponent, ref } from 'vue';
import { ChatMessageCollection } from '~/domain/models/chat/chat-message-collection';
import Self from '~/domain/models/self';
import { ChatInputContainer } from './chat-input';
import { ChatItem } from './chat-item';
import s from './index.module.sass';

export const ChatPanel = defineComponent({
  name: 'ChatPanel',
  props: {
    chatMessageCollection: {
      type: Object as PropType<ChatMessageCollection | undefined>,
      required: true,
    },
    self: {
      type: Object as PropType<Self>,
      required: true,
    },
  },
  setup(props) {
    const chatListViewRef = ref<HTMLDivElement | null>(null);
    const scrollChatListToBottom = () => {
      const listView = chatListViewRef.value;
      listView &&
        listView.scrollTo({ top: listView.scrollHeight, behavior: 'smooth' });
    };
    return () => {
      const { chatMessageCollection } = props;
      if (!chatMessageCollection) {
        return null;
      }
      return (
        <>
          <div
            class={s.list}
            ref={ref => (chatListViewRef.value = ref as HTMLDivElement)}
          >
            {chatMessageCollection.list.map(item => (
              <ChatItem key={item.id} value={item} self={props.self} />
            ))}
          </div>
          <ChatInputContainer
            chatMessageCollection={chatMessageCollection}
            onAfterSendMessage={scrollChatListToBottom}
          />
        </>
      );
    };
  },
});
