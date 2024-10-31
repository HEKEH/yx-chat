import { computed, defineComponent, PropType } from 'vue';
import VideoPlayer from '~/components/video-player';
import { VideoChatMessageItem } from '@yx-chat/shared/types';
import { getFileUrl } from '~/utils/get-file-url';
import s from './VideoChatMessage.module.sass';

const VideoChatMessage = defineComponent({
  name: 'VideoChatMessage',
  props: {
    value: {
      type: Object as PropType<VideoChatMessageItem>,
      required: true,
    },
  },
  setup(props) {
    const option = computed(() => ({
      url: getFileUrl(props.value.data),
    }));
    return () => {
      return (
        <div class={s['video-chat-message']}>
          <VideoPlayer option={option.value} size="small" />
        </div>
      );
    };
  },
});

export default VideoChatMessage;
