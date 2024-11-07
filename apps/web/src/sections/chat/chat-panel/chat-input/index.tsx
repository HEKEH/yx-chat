import { PropType, defineComponent } from 'vue';
import { ChatMessageCollection } from '~/domain/models/chat/chat-message-collection';
import { useAsyncOperation } from '~/hooks/use-async-operation';
import Loading from '~/components/Loading';
import { ElTooltip } from 'element-plus';
import { useI18n } from 'vue-i18n';
import s from './index.module.sass';
import { DraftInput } from './draft-input';
import { FileChooseIcon } from './file-choose';
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
    const { t } = useI18n();
    return () => {
      const { chatMessageCollection } = props;
      if (!chatMessageCollection) {
        return null;
      }
      const draft = chatMessageCollection.draft;
      const hasInputError = draft.hasError;
      const onFilesChoose = (files: File[]) => {
        draft.addFiles(files);
      };
      return (
        <div class={s['chat-input-container']}>
          <DraftInput draft={chatMessageCollection.draft} />
          <div class={s['bottom-row']}>
            <div class={s.actions}>
              <FileChooseIcon
                iconClass={s.icon}
                onFilesChoose={onFilesChoose}
                size={26}
              />
              {!isSending.value ? (
                <ElTooltip content={t('common.send')} placement="top">
                  <PaperAirplane
                    class={{ [s.icon]: true, [s.disabled]: hasInputError }}
                    onClick={hasInputError ? undefined : sendMessage}
                  />
                </ElTooltip>
              ) : (
                <Loading class={s.icon} size={28} />
              )}
            </div>
          </div>
        </div>
      );
    };
  },
});
