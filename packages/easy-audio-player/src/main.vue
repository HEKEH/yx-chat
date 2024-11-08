<template>
  <div class="easy-audio-player" ref="container">
    <div class="player-controls">
      <!-- Play/Pause Button -->
      <button
        :class="['play-pause-btn', { loading: isLoading }]"
        @click="togglePlay"
        :disabled="isLoading"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 24"
          class="play-pause-btn__icon"
        >
          <path
            fill-rule="evenodd"
            :d="isPlaying ? 'M0 0h6v24H0zM12 0h6v24h-6z' : 'M18 12L0 24V0'"
          />
        </svg>
      </button>

      <!-- Progress Bar -->
      <div class="player-progress">
        <span class="controls__current-time">{{ currentTime }}</span>
        <div class="progress-bar-wrapper" @click="handleProgressBarClick">
          <div class="progress-bar">
            <div
              class="progress-bar__fill"
              ref="progressBar"
              :style="{ width: `${percent * 100}%` }"
            >
              <div
                class="progress-bar__pin"
                ref="progressBarPin"
                @mousedown="startDraggingProcess"
                @dragstart.prevent
              ></div>
            </div>
          </div>
        </div>
        <span class="controls__total-time">{{ totalTime }}</span>
      </div>

      <!-- Volume Controls -->
      <div class="right-controls">
        <el-popover
          placement="top"
          trigger="hover"
          width="auto"
          :show-arrow="false"
          popper-class="volume-popover"
          :offset="2"
        >
          <template #reference>
            <button class="control-btn" @click="toggleVolumeOpen">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 22 22"
                class="control-btn__icon"
              >
                <template v-if="volume === 0">
                  <path
                    d="M15 11a3.998 3.998 0 0 0-2-3.465v2.636l1.865 1.865A4.02 4.02 0 0 0 15 11z"
                  />
                  <path
                    d="M13.583 5.583A5.998 5.998 0 0 1 17 11a6 6 0 0 1-.585 2.587l1.477 1.477a8.001 8.001 0 0 0-3.446-11.286 1 1 0 0 0-.863 1.805zm5.195 13.195-2.121-2.121-1.414-1.414-1.415-1.415L13 13l-2-2-3.889-3.889-3.889-3.889a.999.999 0 1 0-1.414 1.414L5.172 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39v-3.131l2.587 2.587-.01.005a1 1 0 0 0 .86 1.806c.215-.102.424-.214.627-.333l2.3 2.3a1.001 1.001 0 0 0 1.414-1.416zM11 5.04a.5.5 0 0 0-.813-.39L8.682 5.854 11 8.172V5.04z"
                  />
                </template>
                <template v-else>
                  <path
                    fill-rule="evenodd"
                    d="M10.188 4.65 6 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39V5.04a.498.498 0 0 0-.812-.39zm4.258-.872a1 1 0 0 0-.862 1.804 6.002 6.002 0 0 1-.007 10.838 1 1 0 0 0 .86 1.806A8.001 8.001 0 0 0 19 11a8.001 8.001 0 0 0-4.554-7.222z"
                  />
                  <path
                    d="M15 11a3.998 3.998 0 0 0-2-3.465v6.93A3.998 3.998 0 0 0 15 11z"
                  />
                </template>
              </svg>
            </button>
          </template>

          <div class="volume-bar-wrapper" ref="volumeBarWrapper">
            <div class="volume-bar" @click="handleVolumeBarClick">
              <div
                class="volume-bar__fill"
                ref="volumeBar"
                :style="{ height: `${volume * 100}%` }"
              >
                <div
                  class="volume-bar__pin"
                  ref="volumeBarPin"
                  @mousedown="startDraggingVolume"
                  @dragstart.prevent
                ></div>
              </div>
            </div>
          </div>
        </el-popover>

        <!-- Download Button -->
        <button
          v-if="showDownloadButton"
          class="control-btn"
          @click="downloadAudio"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="control-btn__icon"
          >
            <path
              fill-rule="evenodd"
              d="M19 9h-4V3H9v6H5l7 8 7-8zM5 18v3h14v-3H5z"
            />
          </svg>
        </button>
      </div>

      <audio ref="player" :src="url" preload="metadata"></audio>
    </div>
  </div>
</template>

<script lang="ts">
import { ElPopover } from 'element-plus';
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  type PropType,
  type Ref,
  ref,
  watchEffect,
} from 'vue';
import { formatTime } from './utils/format';

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

interface AudioPlayerOptions {
  showDownloadButton?: boolean;
}

interface EasyAudioPlayerProps {
  /** Audio source URL */
  url: string;
  /** Player configuration options */
  options: AudioPlayerOptions;
}

const EasyAudioPlayer = defineComponent({
  name: 'EasyAudioPlayer',
  components: {
    ElPopover,
  },

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

  setup(props: EasyAudioPlayerProps) {
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
    return {
      container,
      player,
      isPlaying,
      isLoading,
      progressBar,
      progressBarPin,
      currentTime,
      totalTime,
      percent,
      volumeBar,
      volumeBarPin,
      volumeBarWrapper,
      volume,
      showDownloadButton: computed(
        () => props.options.showDownloadButton ?? true,
      ),
      togglePlay,
      updateProgress,
      handleProgressBarClick,
      startDraggingProcess,
      handleVolumeBarClick,
      startDraggingVolume,
      toggleVolumeOpen,
      downloadAudio: () => window.open(props.url, '_blank'),
    };
  },
});

export default EasyAudioPlayer;
</script>

<style lang="scss">
.easy-audio-player {
  width: 100%;
  min-width: 300px;
  height: 56px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.07);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  border-radius: 4px;
  user-select: none;
  background-color: #fff;
  cursor: default;

  .player-controls {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 8px;
  }

  .play-pause-btn {
    height: 28px;
    padding: 0 2px;
    border: none;
    cursor: pointer;
    display: flex;
    background: transparent;
    justify-content: center;
    align-items: center;

    &.loading {
      opacity: 0.5;
      cursor: wait;
    }
    &__icon {
      width: 12px;
      height: 16px;
      fill: #566574;
    }
  }

  .player-progress {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;

    .progress-bar-wrapper {
      flex: 1;
      cursor: pointer;
      padding: 8px 0;
    }

    .progress-bar {
      height: 4px;
      border-radius: 2px;
      background-color: #e4e4e4;

      &__fill {
        height: 100%;
        background-color: var(--primary-color-10);
        border-radius: 2px;
        position: relative;
        transition: width 0.1s ease-in-out;
        width: 0;
      }

      &__pin {
        width: 12px;
        height: 12px;
        background-color: var(--primary-color-10);
        border-radius: 50%;
        position: absolute;
        right: -6px;
        top: 50%;
        transform: translateY(-50%);
        cursor: grab;
      }

      &__pin:active {
        cursor: grabbing;
      }
    }
  }

  .controls__current-time,
  .controls__total-time {
    font-size: 12px;
    color: #566574;
    width: fit-content;
    padding: 0 2px;
  }

  .right-controls {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;

    .control-btn {
      border: none;
      background: none;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;

      &__icon {
        width: 18px;
        height: 18px;
        fill: #566574;
        color: #566574;
      }
      &:hover {
        opacity: 0.8;
      }
    }
  }
}

.volume-popover {
  min-width: unset !important;
  padding: 10px 0 8px 0 !important;

  .volume-bar-wrapper {
    height: 100px;
    width: 20px;
    display: flex;
    justify-content: center;
  }

  .volume-bar {
    width: 4px;
    height: 100%;
    background: #e4e4e4;
    border-radius: 2px;
    position: relative;
    cursor: pointer;

    &__fill {
      position: absolute;
      bottom: 0;
      width: 100%;
      background: var(--primary-color-10);
      border-radius: 2px;
      transition: height 0.1s ease-in-out;
    }

    &__pin {
      width: 10px;
      height: 10px;
      background: var(--primary-color-10);
      border-radius: 50%;
      position: absolute;
      right: -3px;
      top: -5px;
      cursor: grab;

      &:active {
        cursor: grabbing;
      }
    }
  }
}
</style>
