import {
  PropType,
  defineComponent,
  onBeforeUnmount,
  ref,
  watchEffect,
} from 'vue';
import { AudioDraftItem } from '~/domain/models/chat/massage-draft/audio-draft-item';
import EasyAudioPlayer from 'easy-audio-player';
import s from './AudioDraftInput.module.sass';
import commonS from './Common.module.sass';
import Close from '@/assets/icons/close.svg';

export const AudioDraftInput = defineComponent({
  name: 'AudioDraftInput',
  props: {
    item: {
      type: Object as PropType<AudioDraftItem>,
      required: true,
    },
  },
  emits: {
    delete: (item: AudioDraftItem) => typeof item === 'object',
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
    const audioPlayerOptions = { showDownloadButton: false };
    return () => {
      return objectUrl.value ? (
        <div class={s['audio-wrapper']} onClick={e => e.stopPropagation()}>
          <EasyAudioPlayer
            class={s.audio}
            url={objectUrl.value}
            options={audioPlayerOptions}
          />
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
