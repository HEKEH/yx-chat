import { CSSProperties, PropType, computed, defineComponent } from 'vue';
import clientConfig from '~/config';
import { getFileUrl } from '~/utils/get-file-url';
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
    shape: {
      type: String as PropType<'circle' | 'square'>,
      required: false,
      default: 'circle',
    },
  },
  setup(props) {
    const avatarUrl = computed(() => {
      let { url } = props;
      if (!url) {
        return '';
      }
      // redirect to file center path
      if (url.startsWith('/')) {
        url = `${clientConfig.fileCenterUrl}${url}`;
      } else {
        url = getFileUrl(url);
      }
      return url;
    });

    return () => {
      if (!avatarUrl.value) {
        return null;
      }
      const { status, imgClass, imgStyle, statusSize = 14 } = props;
      return (
        <div class={s.container}>
          <img
            class={[
              s.avatar,
              props.shape === 'circle'
                ? s['avatar-circle']
                : s['avatar-square'],
              imgClass,
            ]}
            style={imgStyle}
            src={avatarUrl.value}
          />
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
