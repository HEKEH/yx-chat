import { PropType, defineComponent } from 'vue';
import MessageDraft, { DraftItem } from '~/domain/models/chat/massage-draft';
import { ChatMessageFormat } from '@yx-chat/shared/types';
import s from './index.module.sass';
import { TextDraftInput } from './TextDraftInput';
import { ImageDraftInput } from './ImageDraftInput';
import { FileDraftInput } from './FileDraftInput';
import { VideoDraftInput } from './VideoDraftInput';

export const DraftInput = defineComponent({
  name: 'DraftInput',
  props: {
    draft: {
      type: Object as PropType<MessageDraft>,
      required: true,
    },
  },
  setup(props) {
    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.kind === 'file') {
            const file = item.getAsFile();
            if (file && !item.webkitGetAsEntry?.()?.isDirectory) {
              // to avoid folder
              props.draft.addFile(file);
            }
          }
        }
      }
    };
    const onDelete = (item: DraftItem) => {
      props.draft.removeItem(item);
    };
    return () => {
      const { draft } = props;
      return (
        <div
          class={s.container}
          onPaste={handlePaste}
          onClick={e => {
            e.stopPropagation();
            draft.onFocus();
          }}
        >
          {draft.globalErrorMsg && (
            <div class={s['error']}>{`(${draft.globalErrorMsg})`}</div>
          )}
          {draft.items.map(item => {
            switch (item.type) {
              case ChatMessageFormat.text:
                return <TextDraftInput key={item.key} item={item} />;
              case ChatMessageFormat.image:
                return (
                  <ImageDraftInput
                    key={item.key}
                    item={item}
                    onDelete={onDelete}
                  />
                );
              case ChatMessageFormat.video:
                return (
                  <VideoDraftInput
                    key={item.key}
                    item={item}
                    onDelete={onDelete}
                  />
                );
              case ChatMessageFormat.file:
                return (
                  <FileDraftInput
                    key={item.key}
                    item={item}
                    onDelete={onDelete}
                  />
                );
            }
            return null;
          })}
        </div>
      );
    };
  },
});
