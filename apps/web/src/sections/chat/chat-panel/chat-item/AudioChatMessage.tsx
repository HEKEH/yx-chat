import { computed, defineComponent, PropType } from 'vue';
import { AudioChatMessageItem } from '@yx-chat/shared/types';
import { getFileUrl } from '~/utils/get-file-url';
import EasyAudioPlayer from '@hekeh/easy-audio-player-vue';
import s from './AudioChatMessage.module.sass';

const AudioChatMessage = defineComponent({
  name: 'AudioChatMessage',
  props: {
    value: {
      type: Object as PropType<AudioChatMessageItem>,
      required: true,
    },
  },
  setup(props) {
    const url = computed(() => getFileUrl(props.value.data));
    return () => {
      return (
        <div class={s['audio-chat-message']}>
          <EasyAudioPlayer url={url.value} />
        </div>
      );
    };
  },
});

export default AudioChatMessage;
