import { ElInput } from 'element-plus';
import { PropType, defineComponent } from 'vue';
import { ChatMessageCollection } from '~/domain/models/chat/chat-message-collection';
import s from './index.module.sass';
import PaperAirplane from '@/assets/icons/paper-airplane.svg';

export const ChatInputContainer = defineComponent({
  name: 'ChatInputContainer',
  props: {
    chatMessageCollection: {
      type: Object as PropType<ChatMessageCollection | undefined>,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const { chatMessageCollection } = props;
      if (!chatMessageCollection) {
        return null;
      }
      const sendMessage = async () => {
        await chatMessageCollection.sendChatMessage();
      };
      return (
        <div class={s['chat-input-container']}>
          <ElInput
            modelValue={chatMessageCollection.draft}
            onUpdate:modelValue={draft => chatMessageCollection.setDraft(draft)}
            onKeydown={e => {
              if ((e as KeyboardEvent).key === 'Enter') {
                sendMessage();
              }
            }}
          />
          <PaperAirplane
            class={s.icon}
            onClick={sendMessage}
            fill="var(--primary-color-6)"
          />
        </div>
      );
    };
  },
});
