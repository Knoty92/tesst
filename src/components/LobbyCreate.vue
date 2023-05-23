<template>
  <div v-if="gamestateStore.phase === Phases.LOBBYCREATE" class="lobby__create">
    <div class="lobby__create-controls">
      <button class="base-button" @click="gamestateStore.phase = Phases.LOBBYLIST">zpět</button>
      <button class="base-button" @click="createRoom()">založit místnost</button>
    </div>
    {{error}}
    
    <label class="d-block mt-20">
      Název hry
      <input v-model="settings.name" type="text" class="base-input d-block" />
    </label>
    <label class="d-block mt-20">
      Heslo
      <input v-model="settings.password" type="text" class="base-input d-block" />
    </label>
    <label class="d-block mt-20">
      Počet bodů pro výhru
      <input v-model="settings.maxPoints" type="number" min="50" max="1000" class="base-input d-block" />
    </label>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import { generateRandomName, generateID } from '@/services/utilitiesService'
import lobbyService from '@/services/lobbyService'

import { gamestate } from '@/store/game-state/gamestateStore'
import { lobby } from '@/store/lobby/lobbyStore'

import { Phases } from '@/enums/phases.enum'
import { Room } from '@/models/room.model'
import { Player } from '@/models/player.model'

const gamestateStore = gamestate()
const lobbyStore = lobby()

const username = localStorage.getItem('username') ? ref(localStorage.getItem('username')) : ref(generateRandomName())
localStorage.setItem('username', username.value ? username.value : '');

const settings = {
  id: '',
  host: gamestateStore.thisPlayerId,
  name: `${username.value} místnost`,
  password: '',
  maxPoints: 100,
  players: [] as Player[]
} as Room

let error = ref('')

onMounted(() => {
  gamestateStore.thisPlayerId = settings.host = gamestateStore.currentPlayer.id = generateID()
})

const createRoom = () => {
  if (!settings.name.trim()) {
    error.value = 'Vyplňte název místnosti'
    return
  }

  if (settings.maxPoints < 50 || settings.maxPoints > 1000 ) {
    error.value = 'Body musí být v rozsahu 50 - 1000'
    return
  }

  settings.id = generateID()

  lobbyService.createRoom({room: settings, player: gamestateStore.currentPlayer})
}
</script>

<style scoped lang="scss">
.lobby__create-controls {
  display: flex;
  justify-content: space-between;
}
</style>
