<template>
  <div class="player-scores">
    <span v-for="(p, index) in gamestateStore.players" :key="index" class="player-scores__player">
      <div class="player-scores__player-box">
        <span class="player-scores__name">
          {{ p.name }}
        </span>
        <span class="player-scores__score">
          <span>{{ p.points }} m</span>
        </span>
      </div>

      <Transition name="scale">
        <Circle
          v-if="gamestateStore.phase === Phases.RESULT"
          :letter="p.latestPoints ?? p.selectedLetter"
          :class="
            gamestateStore.uniqueLettersInQuote.includes(p.selectedLetter)
              ? 'guessed'
              : 'notguessed'
          "
        />
      </Transition>
    </span>
  </div>
</template>
<script setup lang="ts">
import { gamestate } from '@/store/game-state/gamestateStore'
import Circle from '@/components/partials/Circle.vue'
import { Phases } from '@/enums/phases.enum'

const gamestateStore = gamestate()
</script>
<style scoped lang="scss">
.player-scores {
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.player-scores__player {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.player-scores__player-box {
  border: solid 4px $primary;
  min-width: 15rem;
  border-radius: 5px;
  font-weight: bold;
}

.player-scores__name {
  display: block;
  background: $primary;
  color: $blank;
  padding: 0.7rem;
}

.player-scores__score {
  background: $blank;
  display: flex;
  padding: 0.7rem;
  justify-content: flex-end;
  color: black;
}
</style>
