import { ElPopover } from 'element-plus';
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  Ref,
  watchEffect,
} from 'vue';
import s from './index.module.sass';

interface AudioPlayerOptions {
  // enableKeystrokes?: boolean;
  // showTooltips?: boolean;
  showDownloadButton?: boolean;
  // outlineControls?: boolean;
}

const useVolume = (player: Ref<HTMLAudioElement | null>) => {
  const volumeBar = ref<HTMLElement | null>(null);
  const volumeBarPin = ref<HTMLElement | null>(null);
  const volumeBarWrapper = ref<HTMLElement | null>(null);
  const isDraggingVolume = ref(false);
  const volumePercentage = ref(1);
  const isVolumeOpen = ref(true);

  const handleVolumeBarClick = (event: MouseEvent) => {
    if (!volumeBar.value?.parentElement) return;
    isVolumeOpen.value = true;
    const bounds = volumeBar.value.parentElement.getBoundingClientRect();
    const y = bounds.bottom - event.clientY;
    const height = bounds.height;
    const percentage = Math.max(0, Math.min(y / height, 1));
    volumePercentage.value = percentage;
  };

  const startDraggingVolume = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    isDraggingVolume.value = true;
    document.addEventListener('mousemove', handleDraggingVolume);
    document.addEventListener('mouseup', stopDraggingVolume);
  };

  const handleDraggingVolume = (event: MouseEvent) => {
    if (!volumeBar.value?.parentElement) return;
    const bounds = volumeBar.value.parentElement.getBoundingClientRect();
    const y = bounds.bottom - event.clientY;
    const percentage =
      Math.round(Math.max(0, Math.min((y / bounds.height) * 100, 100))) / 100;
    volumePercentage.value = percentage;
  };

  const removeDraggingVolumeListeners = () => {
    document.removeEventListener('mousemove', handleDraggingVolume);
    document.removeEventListener('mouseup', stopDraggingVolume);
  };

  const stopDraggingVolume = () => {
    isDraggingVolume.value = false;
    removeDraggingVolumeListeners();
  };

  onBeforeUnmount(() => {
    removeDraggingVolumeListeners();
  });

  const toggleVolumeOpen = () => {
    isVolumeOpen.value = !isVolumeOpen.value;
  };

  const volume = computed(() => {
    return isVolumeOpen.value ? volumePercentage.value : 0;
  });

  watchEffect(() => {
    if (!player.value) return;
    player.value.volume = volume.value;
  });

  return {
    volumeBar,
    volumeBarPin,
    volume,
    handleVolumeBarClick,
    startDraggingVolume,
    volumeBarWrapper,
    toggleVolumeOpen,
  };
};

const formatTime = (time: number) => {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
};

const useProcess = (player: Ref<HTMLAudioElement | null>) => {
  const progressBar = ref<HTMLElement | null>(null);
  const progressBarPin = ref<HTMLElement | null>(null);
  const currentTime = ref('00:00');
  const totalTime = ref('00:00');
  const isDragging = ref(false);
  const percent = ref(0);

  const updateProgress = () => {
    if (!player.value || !progressBar.value || isDragging.value) return;

    const current = player.value.currentTime;
    const duration = player.value.duration;
    percent.value = current / duration;

    currentTime.value = formatTime(current);
  };

  const handleProgressBarClick = (event: MouseEvent) => {
    if (!player.value || !progressBar.value?.parentElement) return;

    const bounds = progressBar.value.parentElement.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const width = bounds.width;
    percent.value = x / width;
    player.value.currentTime = percent.value * player.value.duration;
  };

  const startDraggingProcess = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    isDragging.value = true;
    document.addEventListener('mousemove', handleDraggingProcess);
    document.addEventListener('mouseup', stopDraggingProcess);
  };

  const handleDraggingProcess = (event: MouseEvent) => {
    if (!player.value || !progressBar.value?.parentElement) return;

    const bounds = progressBar.value.parentElement.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - bounds.left, bounds.width));
    percent.value = x / bounds.width;
    player.value.currentTime = percent.value * player.value.duration;
  };

  const removeDraggingProcessListeners = () => {
    document.removeEventListener('mousemove', handleDraggingProcess);
    document.removeEventListener('mouseup', stopDraggingProcess);
  };

  const stopDraggingProcess = () => {
    isDragging.value = false;
    removeDraggingProcessListeners();
  };

  onBeforeUnmount(() => {
    removeDraggingProcessListeners();
  });

  return {
    progressBar,
    progressBarPin,
    currentTime,
    totalTime,
    percent,
    updateProgress,
    handleProgressBarClick,
    startDraggingProcess,
  };
};

const AudioPlayer = defineComponent({
  name: 'AudioPlayer',

  props: {
    url: {
      type: String,
      required: true,
    },
    options: {
      type: Object as PropType<AudioPlayerOptions>,
      default: () => ({}),
    },
  },

  setup(props) {
    const container = ref<HTMLElement | null>(null);
    const player = ref<HTMLAudioElement | null>(null);
    const isPlaying = ref(false);
    const isLoading = ref(false);

    const {
      progressBar,
      progressBarPin,
      currentTime,
      totalTime,
      percent,
      updateProgress,
      handleProgressBarClick,
      startDraggingProcess,
    } = useProcess(player);

    const {
      volumeBar,
      volumeBarPin,
      volumeBarWrapper,
      volume,
      handleVolumeBarClick,
      startDraggingVolume,
      toggleVolumeOpen,
    } = useVolume(player);

    const togglePlay = async () => {
      if (!player.value) return;

      try {
        if (player.value.paused) {
          // if (props.options.stopOthersOnPlay) {
          //   stopOtherPlayers();
          // }
          isLoading.value = true;
          await player.value.play();
          isPlaying.value = true;
        } else {
          player.value.pause();
          isPlaying.value = false;
        }
      } catch (error) {
        console.error('Playback failed:', error);
      } finally {
        isLoading.value = false;
      }
    };

    const playerEvents = {
      timeupdate: updateProgress,
      loadedmetadata: () => {
        totalTime.value = formatTime(player.value?.duration || 0);
      },
      waiting: () => {
        isLoading.value = true;
      },
      canplay: () => {
        isLoading.value = false;
      },
    };

    onMounted(() => {
      if (!player.value) return;
      Object.entries(playerEvents).forEach(([event, handler]) => {
        player.value?.addEventListener(event, handler);
      });
    });

    onBeforeUnmount(() => {
      if (!player.value) return;

      Object.entries(playerEvents).forEach(([event, handler]) => {
        player.value?.removeEventListener(event, handler);
      });
    });

    return () => {
      const { showDownloadButton = true } = props.options;
      return (
        <div class={s['audio-player']} ref={container}>
          <div class={s['player-controls']}>
            <button
              class={`${s['play-pause-btn']} ${
                isLoading.value ? s['loading'] : ''
              }`}
              onClick={togglePlay}
              disabled={isLoading.value}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 24"
                class={s['play-pause-btn__icon']}
              >
                <path
                  fill-rule="evenodd"
                  d={
                    isPlaying.value
                      ? 'M0 0h6v24H0zM12 0h6v24h-6z'
                      : 'M18 12L0 24V0'
                  }
                />
              </svg>
            </button>

            <div class={s['player-progress']}>
              <span class={s['controls__current-time']}>
                {currentTime.value}
              </span>
              <div
                class={s['progress-bar-wrapper']}
                onClick={handleProgressBarClick}
              >
                <div class={s['progress-bar']}>
                  <div
                    class={s['progress-bar__fill']}
                    style={{ width: `${percent.value * 100}%` }}
                    ref={progressBar}
                  >
                    <div
                      class={s['progress-bar__pin']}
                      ref={progressBarPin}
                      onMousedown={startDraggingProcess}
                      onDragstart={e => e.stopPropagation()}
                    ></div>
                  </div>
                </div>
              </div>
              <span class={s['controls__total-time']}>{totalTime.value}</span>
            </div>

            <div class={s['right-controls']}>
              <ElPopover
                placement="top"
                trigger="hover"
                width="auto"
                showArrow={false}
                popperClass={s['volume-popover']}
                offset={2}
              >
                {{
                  reference: () => (
                    <button class={s['control-btn']} onClick={toggleVolumeOpen}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 22 22"
                        class={s['control-btn__icon']}
                      >
                        {volume.value === 0 ? (
                          <>
                            <path d="M15 11a3.998 3.998 0 0 0-2-3.465v2.636l1.865 1.865A4.02 4.02 0 0 0 15 11z"></path>
                            <path d="M13.583 5.583A5.998 5.998 0 0 1 17 11a6 6 0 0 1-.585 2.587l1.477 1.477a8.001 8.001 0 0 0-3.446-11.286 1 1 0 0 0-.863 1.805zm5.195 13.195-2.121-2.121-1.414-1.414-1.415-1.415L13 13l-2-2-3.889-3.889-3.889-3.889a.999.999 0 1 0-1.414 1.414L5.172 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39v-3.131l2.587 2.587-.01.005a1 1 0 0 0 .86 1.806c.215-.102.424-.214.627-.333l2.3 2.3a1.001 1.001 0 0 0 1.414-1.416zM11 5.04a.5.5 0 0 0-.813-.39L8.682 5.854 11 8.172V5.04z"></path>
                          </>
                        ) : (
                          <>
                            <path
                              fill-rule="evenodd"
                              d="M10.188 4.65 6 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39V5.04a.498.498 0 0 0-.812-.39zm4.258-.872a1 1 0 0 0-.862 1.804 6.002 6.002 0 0 1-.007 10.838 1 1 0 0 0 .86 1.806A8.001 8.001 0 0 0 19 11a8.001 8.001 0 0 0-4.554-7.222z"
                            />
                            <path d="M15 11a3.998 3.998 0 0 0-2-3.465v6.93A3.998 3.998 0 0 0 15 11z"></path>
                          </>
                        )}
                      </svg>
                    </button>
                  ),
                  default: () => (
                    <div class={s['volume-bar-wrapper']} ref={volumeBarWrapper}>
                      <div
                        class={s['volume-bar']}
                        onClick={handleVolumeBarClick}
                      >
                        <div
                          class={s['volume-bar__fill']}
                          ref={volumeBar}
                          style={{ height: `${volume.value * 100}%` }}
                        >
                          <div
                            class={s['volume-bar__pin']}
                            ref={volumeBarPin}
                            onMousedown={startDraggingVolume}
                            onDragstart={e => e.stopPropagation()}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ),
                }}
              </ElPopover>
              {showDownloadButton && (
                <button
                  class={s['control-btn']}
                  onClick={() => {
                    window.open(props.url, '_blank');
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    class={s['control-btn__icon']}
                  >
                    <path
                      fill-rule="evenodd"
                      d="M19 9h-4V3H9v6H5l7 8 7-8zM5 18v3h14v-3H5z"
                    />
                  </svg>
                </button>
              )}
            </div>

            <audio ref={player} src={props.url} preload="metadata"></audio>
          </div>
        </div>
      );
    };
  },
});

export default AudioPlayer;
