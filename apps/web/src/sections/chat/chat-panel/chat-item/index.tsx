import { PropType, defineComponent } from 'vue';
import { Avatar } from '~/components/avatar';
import { ChatMessageModel } from '~/domain/models/chat/chat-message';
import Self from '~/domain/models/self';
import { ChatMessageFormat, ChatMessageItem } from '@yx-chat/shared/types';
import { getFileUrl } from '~/utils/get-file-url';
import CustomImage from '~/components/image';
import s from './index.module.sass';
import FileChatMessage from './FileChatMessage';
import VideoChatMessage from './VideoChatMessage';

const MessageBody = defineComponent({
  name: 'MessageBody',
  props: {
    isFromSelf: {
      type: Boolean,
      required: true,
    },
    value: {
      type: Array as PropType<ChatMessageItem[]>,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const { value, isFromSelf } = props;
      return (
        <div class={s.message}>
          <div class={s.content}>
            {value.map((item, index) => {
              if (item.type === ChatMessageFormat.text) {
                return (
                  <div key={index} class={s['text-message']}>
                    {item.data}
                  </div>
                );
              }
              if (item.type === ChatMessageFormat.image) {
                const url = getFileUrl(item.data);
                return (
                  <div key={index} class={s['image-message']}>
                    <CustomImage
                      class={s.image}
                      src={url}
                      preview-src-list={[url]}
                      fit="cover"
                      hide-on-click-modal
                    />
                  </div>
                );
              }
              if (item.type === ChatMessageFormat.video) {
                return <VideoChatMessage key={index} value={item} />;
              }
              if (item.type === ChatMessageFormat.file) {
                return (
                  <FileChatMessage
                    key={index}
                    value={item}
                    isFromSelf={isFromSelf}
                  />
                );
              }
            })}
          </div>
          <div class={s.arrow} />
        </div>
      );
    };
  },
});

export const ChatItem = defineComponent({
  name: 'ChatItem',
  props: {
    value: {
      type: Object as PropType<ChatMessageModel>,
      required: true,
    },
    self: {
      type: Object as PropType<Self>,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const { value, self } = props;
      const { from } = value;
      const isFromSelf = from.id === self.id;
      return (
        <div class={[s['chat-item'], isFromSelf ? s.right : s.left]}>
          <Avatar url={from.avatar} class={s.avatar} />
          <div class={s.container}>
            <div class={[s.row, s['first-row']]}>
              <div class={s.name}>{from.name}</div>
              <div class={s.time}>{value.createTime.format()}</div>
            </div>
            <div class={[s.row, s['second-row']]}>
              <MessageBody isFromSelf={isFromSelf} value={value.items} />
            </div>
          </div>
        </div>
      );
    };
  },
});
