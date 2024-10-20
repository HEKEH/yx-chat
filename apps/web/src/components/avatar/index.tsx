import { CSSProperties, PropType, defineComponent } from 'vue';
import clientConfig from '~/config';
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
    imgStyle: {
      type: Object as PropType<CSSProperties>,
      required: false,
    },
    imgClass: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    return () => {
      let { url } = props;
      if (!url) {
        return null;
      }
      // redirect to file center path
      if (url.startsWith('/')) {
        url = `${clientConfig.fileCenterUrl}${url}`;
      } else {
        url = `${clientConfig.fileCenterUrl}/file/${url}`;
      }
      const { status, imgClass, imgStyle, statusSize = 14 } = props;
      return (
        <div class={s.container}>
          <img class={[s.avatar, imgClass]} style={imgStyle} src={url} />
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
