import { PropType, defineComponent } from 'vue';
import { ChatMessageCollection } from '~/domain/models/chat/chat-message-collection';
import { useAsyncOperation } from '~/hooks/use-async-operation';
import Loading from '~/components/Loading';
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
    const { isProcessing: isSending, execute: sendMessage } = useAsyncOperation(
      async () => {
        await props.chatMessageCollection?.sendChatMessage();
      },
    );
    return () => {
      const { chatMessageCollection } = props;
      if (!chatMessageCollection) {
        return null;
      }
      const iconSize = 28;
      return (
        <div class={s['chat-input-container']}>
          <DraftInput draft={chatMessageCollection.draft} />
          <div class={s.actions}>
            {!isSending.value ? (
              <PaperAirplane
                width={iconSize}
                height={iconSize}
                class={s.icon}
                onClick={sendMessage}
              />
            ) : (
              <Loading class={s.icon} size={iconSize} />
            )}
          </div>
        </div>
      );
    };
  },
});
