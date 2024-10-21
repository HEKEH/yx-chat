import { CSSProperties, PropType, computed, defineComponent } from 'vue';
import clientConfig from '~/config';
import getToken from '~/infra/local-storage-store/get-token';
import {
  LANGUAGE_HEADER_KEY,
  TOKEN_HEADER_KEY,
} from '@yx-chat/shared/constants';
import { useI18n } from 'vue-i18n';
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
    const i18n = useI18n();

    const avatarUrl = computed(() => {
      let { url } = props;
      if (!url) {
        return '';
      }
      // redirect to file center path
      if (url.startsWith('/')) {
        url = `${clientConfig.fileCenterUrl}${url}`;
      } else {
        url = `${clientConfig.fileCenterUrl}/file/${url}`;
        // 添加 token 到 URL
        const token = getToken();
        url = `${url}${
          url.includes('?') ? '&' : '?'
        }${TOKEN_HEADER_KEY}=${token}&${LANGUAGE_HEADER_KEY}=${
          i18n.locale.value
        }`;
      }
      return url;
    });

    // const imageType = computed(() => {
    //   if (!avatarUrl.value) return '';
    //   const extension = avatarUrl.value.split('.').pop()?.toLowerCase();
    //   switch (extension) {
    //     case 'svg':
    //       return 'image/svg+xml';
    //     case 'gif':
    //       return 'image/gif';
    //     case 'png':
    //       return 'image/png';
    //     case 'jpg':
    //     case 'jpeg':
    //       return 'image/jpeg';
    //     case 'webp':
    //       return 'image/webp';
    //     case 'bmp':
    //       return 'image/bmp';
    //     case 'ico':
    //       return 'image/x-icon';
    //     default:
    //       return 'image/png';
    //   }
    // });

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
