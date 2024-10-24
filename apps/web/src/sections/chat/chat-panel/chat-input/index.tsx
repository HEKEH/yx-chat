import { PropType, defineComponent } from 'vue';
import { ChatMessageCollection } from '~/domain/models/chat/chat-message-collection';
import s from './index.module.sass';
import { DraftInput } from './draft-input';
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
          <DraftInput draft={chatMessageCollection.draft} />
          <div class={s.actions}>
            <PaperAirplane
              class={s.icon}
              onClick={sendMessage}
              fill="var(--primary-color-6)"
            />
          </div>
        </div>
      );
    };
  },
});
