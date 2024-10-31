import {
  PropType,
  computed,
  defineComponent,
  onBeforeUnmount,
  ref,
  watchEffect,
} from 'vue';
import { VideoDraftItem } from '~/domain/models/chat/massage-draft/video-draft-item';
import VideoPlayer, { VideoPlayerOption } from '~/components/video-player';
import s from './VideoDraftInput.module.sass';
import commonS from './Common.module.sass';
import Close from '@/assets/icons/close.svg';

export const VideoDraftInput = defineComponent({
  name: 'VideoDraftInput',
  props: {
    item: {
      type: Object as PropType<VideoDraftItem>,
      required: true,
    },
  },
  emits: {
    delete: (item: VideoDraftItem) => typeof item === 'object',
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
      const option = computed<VideoPlayerOption>(() => ({
        url: objectUrl.value ?? '',
      }));
      return objectUrl.value ? (
        <div class={s['video-wrapper']} onClick={e => e.stopPropagation()}>
          <VideoPlayer class={s.video} size="small" option={option.value} />
          {props.item.errorMsg ? (
            <span class={commonS.error}>{`(${props.item.errorMsg})`}</span>
          ) : null}
          <div
            class="delete-icon"
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
