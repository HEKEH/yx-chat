import { PropType, defineComponent } from 'vue';
import { Avatar } from '~/components/avatar';
import { IChatMessageModel } from '~/domain/models/chat/chat-message';
import Self from '~/domain/models/self';
import s from './index.module.sass';

export const ChatItem = defineComponent({
  name: 'ChatItem',
  props: {
    value: {
      type: Object as PropType<IChatMessageModel>,
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
      const isSelf = from.id === self.id;
      return (
        <div class={[s['chat-item'], isSelf ? s.right : s.left]}>
          <Avatar url={from.avatar} class={s.avatar} />
          <div class={s.container}>
            <div class={[s.row, s['first-row']]}>
              <div class={s.name}>{from.name}</div>
              <div class={s.time}>{value.createTime.format()}</div>
            </div>
            <div class={[s.row, s['second-row']]}>
              <div class={s.message}>
                <div class={s.content}>{value.content}</div>
                <div class={s.arrow} />
              </div>
            </div>
          </div>
        </div>
      );
    };
  },
});
