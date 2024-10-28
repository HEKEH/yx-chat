import { ElImage } from 'element-plus';
import {
  PropType,
  defineComponent,
  onBeforeUnmount,
  ref,
  watchEffect,
} from 'vue';
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
    const objectUrl = ref<string | null>(null);

    watchEffect(() => {
      const file = props.item.content;
      if (file) {
        // Revoke the previous object URL if it exists
        if (objectUrl.value) {
          URL.revokeObjectURL(objectUrl.value);
        }
        objectUrl.value = URL.createObjectURL(file);
      } else {
        if (objectUrl.value) {
          URL.revokeObjectURL(objectUrl.value);
        }
        objectUrl.value = null;
      }
    });

    // Clean up the object URL when the component is unmounted
    onBeforeUnmount(() => {
      if (objectUrl.value) {
        URL.revokeObjectURL(objectUrl.value);
      }
    });

    return () => {
      return objectUrl.value ? (
        <div class={s['image-wrapper']} onClick={e => e.stopPropagation()}>
          <ElImage
            class={s.image}
            src={objectUrl.value}
            preview-src-list={[objectUrl.value]}
            fit="cover"
            hide-on-click-modal
          />
          {props.item.errorMsg ? (
            <span class={s.error}>{`(${props.item.errorMsg})`}</span>
          ) : null}
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
