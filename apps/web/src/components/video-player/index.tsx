import Artplayer from 'artplayer';
import type { Option as ArtplayerOption } from 'artplayer/types/option';
import {
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  watch,
} from 'vue';
import { useI18n } from 'vue-i18n';
import s from './index.module.sass';
export type VideoPlayerOption = Omit<ArtplayerOption, 'container'>;

const createDownloadIcon = (): HTMLElement => {
  const downloadIconSvg = `<svg stroke="currentColor" stroke-width="5" width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 24.0083V42H42V24" stroke="inherit" stroke-width="inherit" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M33 23L24 32L15 23" stroke="inherit" stroke-width="inherit" stroke-linecap="round" stroke-linejoin="round"/><path d="M23.9917 6V32" stroke="inherit" stroke-width="inherit" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const icon = document.createElement('i');
  icon.className = 'art-icon hint--rounded hint--top';
  icon.style.display = 'flex';
  icon.innerHTML = downloadIconSvg;
  return icon;
};

const VideoPlayer = defineComponent({
  name: 'VideoPlayer',
  props: {
    option: {
      type: Object as PropType<VideoPlayerOption>,
      required: true,
    },
    size: {
      type: String as PropType<'small' | 'normal'>,
      default: 'normal',
    },
  },
  emits: ['getInstance'],
  setup(props, { emit }) {
    const { t, locale } = useI18n();
    const instance = ref<Artplayer | null>(null);
    const containerRef = ref<HTMLDivElement | null>(null);
    const isFullscreen = ref(false);
    const downloadIconRef = ref<HTMLElement>(createDownloadIcon());
    const hasError = ref(false);
    const isLoading = ref(false);

    const initArtplayer = async () => {
      if (!containerRef.value) return;
      isLoading.value = true;
      if (instance.value) {
        instance.value.destroy(true);
        instance.value = null;
      }
      downloadIconRef.value.setAttribute('aria-label', t('common.download'));
      await nextTick();
      const art = new Artplayer(
        {
          autoSize: true,
          fullscreen: true,
          lang: locale.value,
          controls: [
            {
              position: 'right',
              html: downloadIconRef.value,
              click: function () {
                window.open(props.option.url, '_blank');
              },
            },
            ...(props.option.controls || []),
          ],
          ...props.option,
          container: containerRef.value,
        },
        () => {
          if (containerRef.value) {
            hasError.value = false;
            const video = art.video;
            const ratio = video.videoWidth / video.videoHeight;
            containerRef.value.style.aspectRatio = `${ratio}`;
          }
          isLoading.value = false;
        },
      );
      art.on('fullscreen', state => {
        isFullscreen.value = state;
      });
      art.on('error', (e: any, reconnectTime: number) => {
        if (e.type === 'error' && reconnectTime >= 5) {
          isLoading.value = false;
          hasError.value = true;
        }
      });
      instance.value = art;
      emit('getInstance', instance.value);
    };
    watch(() => locale.value, initArtplayer);
    watch(() => props.option, initArtplayer, { deep: true });

    onMounted(initArtplayer);
    onBeforeUnmount(() => {
      instance.value?.destroy(true);
      instance.value = null;
    });
    return () => (
      <div
        v-loading={isLoading.value}
        ref={containerRef}
        class={{
          [s['video-player']]: true,
          [s['video-player-small']]:
            props.size === 'small' && !isFullscreen.value,
        }}
      >
        {hasError.value && (
          <div class={s['video-player-error']}>
            {t('common.videoLoadFailed')}
          </div>
        )}
      </div>
    );
  },
});

export default VideoPlayer;
