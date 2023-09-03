import { PropType, defineComponent } from 'vue';
import { ChatMessageCollection } from '~/domain/models/chat/chat-message-collection';
import Self from '~/domain/models/self';
import { ChatMessageItem } from '../message-item';
import s from './index.module.sass';

export const ChatMessagePanel = defineComponent({
  name: 'ChatMessagePanel',
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
    return () => {
      const { chatMessageCollection } = props;
      if (!chatMessageCollection) {
        return null;
      }
      return (
        <div class={s.list}>
          {chatMessageCollection.list.map(item => (
            <ChatMessageItem key={item.id} value={item} self={props.self} />
          ))}
        </div>
      );
    };
  },
});
