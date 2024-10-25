import { PropType, defineComponent } from 'vue';
import MessageDraft, { DraftItem } from '~/domain/models/chat/massage-draft';
import { DraftContentType } from '~/domain/models/chat/massage-draft/types';
import s from './index.module.sass';
import { TextDraftInput } from './TextDraftInput';
import { ImageDraftInput } from './ImageDraftInput';

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
          if (items[i].type.indexOf('image') !== -1) {
            const file = items[i].getAsFile();
            if (file) {
              props.draft.addImage(file);
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
          {draft.items.map(item => {
            if (item.type === DraftContentType.Text) {
              return <TextDraftInput key={item.key} item={item} />;
            } else if (item.type === DraftContentType.Image) {
              return (
                <ImageDraftInput
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
