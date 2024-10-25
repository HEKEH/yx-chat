import { PropType, defineComponent, ref, watchEffect } from 'vue';
import { ElImage } from 'element-plus';
import { ImageDraftItem } from '~/domain/models/chat/massage-draft/image-draft-item';
import s from './ImageDraftInput.module.sass';
import Close from '@/assets/icons/close.svg';

export const ImageDraftInput = defineComponent({
  name: 'ImageDraftInput',
  components: {
    ElImage,
  },
  props: {
    item: {
      type: Object as PropType<ImageDraftItem>,
      required: true,
    },
  },
  emits: {
    delete: (item: ImageDraftItem) => typeof item === 'object',
  },
  setup(props, { emit }) {
    const base64 = ref<string | null>(null);

    watchEffect(() => {
      const file = props.item.content;
      if (file) {
        base64.value = URL.createObjectURL(file);
      } else {
        base64.value = null;
      }
    });

    return () => {
      return base64.value ? (
        <div class={s['image-wrapper']} onClick={e => e.stopPropagation()}>
          <ElImage
            class={s.image}
            src={base64.value}
            preview-src-list={[base64.value]}
            fit="cover"
            hide-on-click-modal
          />
          <div
            class={s['delete-icon']}
            onClick={() => {
              emit('delete', props.item);
            }}
          >
            <Close width={12} height={12} />
          </div>
        </div>
      ) : null;
    };
  },
});
