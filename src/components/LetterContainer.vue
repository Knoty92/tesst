<template>
  <div class="letter-container" :class="{ done: isGuessed }">
    {{ isGuessed ? props.letter : '_' }}
  </div>
</template>
<script setup lang="ts">
import { gamestate } from '@/store/game-state/gamestateStore'
import { computed } from 'vue'

const gamestateStore = gamestate()
const props = defineProps<{ letter: string }>()
const isGuessed = computed(() =>
  gamestateStore.alreadyPlayedLettersInQuote.includes(props.letter.toUpperCase())
)
</script>
<style lang="scss" scoped>


.letter-container {
  padding: 5px;
  background: black;
  border-radius: 5px;
  margin-left: 5px;
  float: left;
  height: 35px;
  width: 25px;
  margin-bottom: 5px;
  color: white;

  &.done {
    background-color: green;
  }
}

.letter-space {
  padding: 5px;
  margin-left: 5px;
  float: left;
  height: 25px;
  width: 15px;
  margin-bottom: 5px;
}</style>
