import { ElPopover } from 'element-plus';
import {
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
  const volume = ref(1);

  const handleVolumeBarClick = (event: MouseEvent) => {
    if (!volumeBar.value?.parentElement) return;
    const bounds = volumeBar.value.parentElement.getBoundingClientRect();
    const y = bounds.bottom - event.clientY;
    const height = bounds.height;
    const percentage = Math.max(0, Math.min(y / height, 1));
    volume.value = percentage;
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
    volume.value = percentage;
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
                trigger="click"
                width="auto"
                showArrow={false}
                popperClass={s['volume-popover']}
                offset={2}
              >
                {{
                  reference: () => (
                    <button class={s['control-btn']}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        class={s['control-btn__icon']}
                      >
                        <path
                          fill-rule="evenodd"
                          d={
                            volume.value === 0
                              ? 'M0 7.667v8h5.333L12 22.333V1L5.333 7.667'
                              : volume.value < 0.5
                              ? 'M0 7.667v8h5.333L12 22.333V1L5.333 7.667M17.333 11.373C17.333 9.013 16 6.987 14 6v10.707c2-.947 3.333-2.987 3.333-5.334z'
                              : 'M14.667 0v2.747c3.853 1.146 6.666 4.72 6.666 8.946 0 4.227-2.813 7.787-6.666 8.934v2.76C20 22.173 24 17.4 24 11.693 24 5.987 20 1.213 14.667 0zM18 11.693c0-2.36-1.333-4.386-3.333-5.373v10.707c2-.947 3.333-2.987 3.333-5.334zm-18-4v8h5.333L12 22.36V1.027L5.333 7.693H0z'
                          }
                        />
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
                      d="M20 8h-5V2H9v6H4l8 9 8-9zM4 19v3h16v-3H4z"
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
