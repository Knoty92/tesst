<template>
  <div class="pyramid">
    <div class="pyramid__row" v-for="(p, index) in pyramid" :key="index">
      <Circle
        v-for="(l, index) in p.availableLetters"
        :key="index"
        :letter="l"
        @click="selectLetter(p, l)"
        :class="{ active: thisPlayer.selectedLetter === l, locked: thisPlayer.selectedLetter }"
      />
    </div>

    <span class="countdown-wrapper">
      <Circle
        :letter="gamestateStore.timer >= 0 ? gamestateStore.timer : 0"
        class="countdown"
        :countdown="true"
      />
    </span>
  </div>
</template>
<script setup lang="ts">
import { getPyramid } from '@/services/gamestateService'
import { gamestate } from '@/store/game-state/gamestateStore'
import Circle from '@/components/partials/Circle.vue'
import { PyramidLetterGroup } from '@/models/pyramidLetterGroup.model'

const pyramid = getPyramid()
const gamestateStore = gamestate()

const thisPlayer = gamestateStore.thisPlayer

const selectLetter = (pyramidGroup: PyramidLetterGroup, letter: string) => {
  if (thisPlayer) {
    thisPlayer.selectedLetter = letter
  }
}
</script>
<style scoped lang="scss">
.pyramid {
  position: absolute;
  z-index: 2;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.pyramid__row {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.countdown-wrapper {
  display: inline-block;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 2rem;
}
</style>
