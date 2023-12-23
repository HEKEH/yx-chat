import { PropType, defineComponent } from 'vue';
import { ChatMessageCollection } from '~/domain/models/chat/chat-message-collection';
import Self from '~/domain/models/self';
import { ChatItemList } from './ChatItemList';
import { ChatInputContainer } from './chat-input';

export const ChatPanel = defineComponent({
  name: 'ChatPanel',
  props: {
    chatMessageCollection: {
      type: Object as PropType<ChatMessageCollection>,
    },
    self: {
      type: Object as PropType<Self>,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const { chatMessageCollection } = props;
      if (!chatMessageCollection) {
        return null;
      }
      return (
        <>
          <ChatItemList
            chatMessageCollection={chatMessageCollection}
            self={props.self}
          />
          <ChatInputContainer chatMessageCollection={chatMessageCollection} />
        </>
      );
    };
  },
});
