<template>
  <span class="circle">
    {{ letter }}
  </span>
</template>
<script setup lang="ts">
  import { computed } from "vue";
  const props = defineProps({
    letter: [String, Number],
    countdown: Boolean,
  })

  const countdownLightness = computed(() => `hsl(0deg 100% ${props.countdown ? 50 +Number(props.letter) * 5 : 100}%)`)

</script>
<style scoped lang="scss">
.circle {
  display: flex;
  width: 5.8rem;
  height: 5.8rem;
  justify-content: center;
  align-items: center;
  border: solid 4px $primary;
  border-radius: 100%;
  font-weight: bold;
  font-size: 2rem;
  cursor: pointer;
  background: $blank;
  color: $primary;
  transition: background 0.3s ease, color 0.3s ease, border 0.3s ease;

  &:hover, &.active {
    background: $primary;
    color: $blank;
  }

  &.locked {
    pointer-events: none;
  }
}

.circle.countdown {
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 4px black;
  background: v-bind('countdownLightness');
  color: black;
  pointer-events: none;
}

.circle.guessed {
  background: #12c22b;
  border: solid 4px #085013;
  color: #085013;
  pointer-events: none;
}

.circle.notguessed {
  background: #ff0000;
  border: solid 4px #5e0a0a;
  color: #5e0a0a;
  pointer-events: none;
}
</style>
