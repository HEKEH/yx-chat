<template>
  <div class="audio-player">
    <audio
      ref="audio"
      :src="src"
      @timeupdate="updateTime"
      @ended="resetPlayer"
    ></audio>
    <div class="controls">
      <button @click="togglePlay">{{ isPlaying ? 'Pause' : 'Play' }}</button>
      <span>{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { formatTime } from './utils/format.js';

export interface AudioPlayerProps {
  src: string;
}

export default {
  name: 'AudioPlayer',
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  setup(props: AudioPlayerProps) {
    const audio = ref<HTMLAudioElement | null>(null);
    const isPlaying = ref(false);
    const currentTime = ref(0);
    const duration = ref(0);

    const togglePlay = () => {
      if (!audio.value) return;
      if (audio.value.paused) {
        audio.value.play();
        isPlaying.value = true;
      } else {
        audio.value.pause();
        isPlaying.value = false;
      }
    };

    const updateTime = () => {
      if (!audio.value) return;
      currentTime.value = audio.value.currentTime;
      duration.value = audio.value.duration;
    };

    const resetPlayer = () => {
      isPlaying.value = false;
      currentTime.value = 0;
    };

    onMounted(() => {
      if (!audio.value) return;
      duration.value = audio.value.duration;
    });

    return {
      audio,
      isPlaying,
      currentTime,
      duration,
      togglePlay,
      updateTime,
      resetPlayer,
      formatTime,
    };
  },
};
</script>

<style lang="scss">
.audio-player {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.controls {
  display: flex;
  align-items: center;
}

button {
  margin-right: 10px;
}
</style>
