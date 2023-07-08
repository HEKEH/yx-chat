import { PropType, defineComponent } from 'vue';
import s from './index.module.sass';

export const Avatar = defineComponent({
  name: 'AvatarItem',
  props: {
    url: {
      type: String,
      required: false,
    },
    status: {
      type: String as PropType<'online' | 'offline'>,
      required: false,
    },
    statusSize: {
      type: Number,
      required: false,
    },
  },
  setup(props) {
    return () => {
      const { url } = props;
      if (!url) {
        return null;
      }
      const { status, statusSize = 14 } = props;
      return (
        <div class={s.container}>
          <img class={s.avatar} src={url} />
          {status && (
            <div
              style={{ width: `${statusSize}px` }}
              class={s['status-container']}
            >
              <div
                class={[s.status, status === 'online' ? s.online : s.offline]}
              />
            </div>
          )}
        </div>
      );
    };
  },
});
