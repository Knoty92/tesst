<template>
  <input id="toggle-checkbox" v-model="show" type="checkbox" :label="show ? 'Schovat' : 'Zobrazit'" />
  <div v-if="show"  id="guess-container" class="frozen-effect-container">
    <div id="sentence-container">
      <div
        v-for="(word, wordIndex) in gamestateStore.quote.text.split(' ')"
        :key="wordIndex"
        class="word-container"
      >
        <template v-for="(letter, letterIndex) in word" :key="letterIndex">
          <span v-if="letter === ','" style="float: left; font-size: 2.5em">
            {{ letter }}
          </span>
          <LetterContainer v-else :letter="letter" />
        </template>
      </div>
    </div>
    <div
      id="author-container"
      v-if="gamestateStore.thisPlayer.points >= gamestateStore.settings.maxPoints"
    >
      {{ gamestateStore.quote.author }}
    </div>
  </div>
</template>
<script setup lang="ts">
import LetterContainer from './LetterContainer.vue'
import { gamestate } from '@/store/game-state/gamestateStore'
import guessContainerService from '@/services/guessContainerService'
import { ref } from 'vue';

//dev purposes
const show = ref(true)

const gamestateStore = gamestate()

;(async () => {
  await guessContainerService.getRandomQuoteAndStartGame()
})()
</script>
<style lang="scss" scoped>

#toggle-checkbox{
  position:fixed;
  bottom: 0;
  z-index: 3;
  left: 0;
}

.frozen-effect-container {
  background-color: rgb(255 255 255 / 58%);
  backdrop-filter: blur(21px);
}

.word-container {
  margin-left: 35px;
  float: left;
}

#guess-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 15px;
  height: 35%;
  overflow: scroll;
}

#author-container {
  position: absolute;
  bottom: 0px;
  right: 0px;
  color: black;
  font-size: 1.5em;
}

</style>
