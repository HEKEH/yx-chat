import { FileChatMessageItem } from '@yx-chat/shared/types';
import { PropType, defineComponent } from 'vue';
import { FileView } from '~/components/file';
import { getFileUrl } from '~/utils/get-file-url';
import s from './FileChatMessage.module.sass';
import DownloadIcon from '@/assets/icons/download.svg';

const FileChatMessage = defineComponent({
  name: 'FileChatMessage',
  props: {
    isFromSelf: {
      type: Boolean,
      required: true,
    },
    value: {
      type: Object as PropType<FileChatMessageItem>,
      required: true,
    },
  },
  setup(props) {
    const downloadFile = () => {
      const { data: uploadedFilename, name } = props.value;
      const url = getFileUrl(uploadedFilename, name);
      window.open(url, '_blank');
    };
    return () => {
      const { value, isFromSelf } = props;
      return (
        <div
          class={{
            [s['file-chat-message']]: true,
            [s['from-self']]: isFromSelf,
          }}
          onClick={downloadFile}
        >
          <FileView class={s.file} filename={value.name} />
          <DownloadIcon width={28} height={28} class={s.download} />
        </div>
      );
    };
  },
});

export default FileChatMessage;
