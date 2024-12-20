import { ElInput } from 'element-plus';
import {
  PropType,
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue';
import { TextDraftItem } from '~/domain/models/chat/massage-draft/text-draft-item';
import s from './TextDraftInput.module.sass';

export const TextDraftInput = defineComponent({
  name: 'TextDraftInput',
  props: {
    item: {
      type: Object as PropType<TextDraftItem>,
      required: true,
    },
  },
  emits: {
    pasteFile: (
      event: ClipboardEvent,
      selectionStart: number,
      selectionEnd: number,
    ) => true,
  },
  setup(props, { emit }) {
    const inputRef = ref<HTMLInputElement | null>(null);
    const textareaRef = computed<HTMLTextAreaElement | null>(
      () => (inputRef.value as any)?.textarea,
    );
    const focus = (atStart = false) => {
      inputRef.value?.focus();
      // Position cursor at the end of the input
      const textarea = textareaRef.value;
      if (!atStart) {
        const length = textarea?.value?.length;
        if (length) {
          textarea.setSelectionRange(length, length);
        }
      } else {
        textarea?.setSelectionRange(0, 0);
      }
    };
    const subscription = props.item.focusSubject.subscribe(() => focus());
    onMounted(() => {
      focus(true); // Usually element is created after pasting files, at this time focus at the start of the input
      textareaRef.value?.addEventListener('paste', handlePaste);
    });
    onBeforeUnmount(() => {
      subscription.unsubscribe();
      textareaRef.value?.removeEventListener('paste', handlePaste);
    });

    const handlePaste = (e: ClipboardEvent) => {
      const text = e.clipboardData?.getData('text/plain');
      if (!text) {
        // Handle paste file

        // Prevent paste file name
        e.preventDefault();
        e.stopPropagation();

        const textArea = e.target as HTMLTextAreaElement; // = textareaRef.value
        emit('pasteFile', e, textArea.selectionStart, textArea.selectionEnd);
      } else {
        // do default behavior, no need to handle
      }
    };
    return () => {
      const { item } = props;
      return (
        <ElInput
          onClick={e => {
            e.stopPropagation();
          }}
          ref={inputRef}
          class={s['text-input']}
          modelValue={item.content}
          onUpdate:modelValue={content => item.setContent(content)}
          type="textarea"
          autosize={{ minRows: 1 }}
          resize="none"
        />
      );
    };
  },
});
