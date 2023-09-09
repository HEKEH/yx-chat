import { PropType, defineComponent } from 'vue';
import { ChatMessageManager } from '~/domain/models/chat/chat-message-manager';
import { ContactItem } from '../contact-tabs/ContactItem';
import s from './index.module.sass';

export const ChatMessageCollectionList = defineComponent({
  name: 'ChatMessageCollectionList',
  props: {
    chatMessageManager: {
      type: Object as PropType<ChatMessageManager>,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const { chatMessageManager } = props;
      return (
        <div class={s.list}>
          {chatMessageManager.list.map(item => (
            <ContactItem
              key={item.id}
              value={item.owner}
              isSelected={item.id === chatMessageManager.selectedId}
              onSelect={() => {
                chatMessageManager.selectById(item.id);
              }}
            />
          ))}
        </div>
      );
    };
  },
});
