<template>
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
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  ref,
  toRef,
  watch,
  type PropType,
  type Ref,
} from 'vue';
import { formatTime } from '../utils/format';

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

  const playerEvents = {
    timeupdate: updateProgress,
    loadedmetadata: () => {
      totalTime.value = formatTime(player.value?.duration || 0);
    },
  };

  watch(
    () => player.value,
    (newPlayer, oldPlayer) => {
      if (oldPlayer) {
        Object.entries(playerEvents).forEach(([event, handler]) => {
          oldPlayer.removeEventListener(event, handler);
        });
      }
      if (newPlayer) {
        Object.entries(playerEvents).forEach(([event, handler]) => {
          newPlayer.addEventListener(event, handler);
        });
      }
    },
  );

  onBeforeUnmount(() => {
    const playerDom = player.value;
    if (playerDom) {
      Object.entries(playerEvents).forEach(([event, handler]) => {
        playerDom.removeEventListener(event, handler);
      });
    }
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

const PlayerProgress = defineComponent({
  name: 'PlayerProgress',
  props: {
    player: {
      type: [Object, null] as PropType<HTMLAudioElement | null>,
      required: true,
    },
  },

  setup(props) {
    const {
      progressBar,
      progressBarPin,
      currentTime,
      totalTime,
      percent,
      updateProgress,
      handleProgressBarClick,
      startDraggingProcess,
    } = useProcess(toRef(props, 'player'));

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
  },
});

export default PlayerProgress;
</script>

<style lang="scss">
.easy-audio-player {
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
}
</style>
