<template>
  <div v-if="gamestateStore.phase === Phases.LOBBYGAME" class="lobby__game">
    <div class="lobby__list-controls">
      <button  class="base-button" @click="leaveRoom()">opustit hru</button>
      <button class="base-button">spustit hru</button>
    </div>
    <strong class="mt-20 d-block header">{{ lobbyStore.currentRoom.name }}</strong>
    <div v-for="(player, index) in lobbyStore.currentRoom.players" :key="index" class="lobby__game-player">
      <span>{{ player.name }}</span>
      <span v-if="lobbyStore.currentRoom.host === gamestateStore.currentPlayer.id && player.id !== gamestateStore.currentPlayer.id" @click="kickPlayer(player)">
        <svg class="kick" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="m326.6 166.6 22.7-22.6L304 98.7l-22.6 22.6-89.4 89.4-89.4-89.4L80 98.7 34.7 144l22.6 22.6 89.4 89.4-89.3 89.4L34.7 368 80 413.3l22.6-22.6 89.4-89.4 89.4 89.4 22.6 22.6 45.3-45.3-22.6-22.6-89.4-89.4 89.4-89.4z"/></svg>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, onBeforeUnmount } from 'vue'

import lobbyService from '@/services/lobbyService'

import { gamestate } from '@/store/game-state/gamestateStore'
import { lobby } from '@/store/lobby/lobbyStore'

import { Phases } from '@/enums/phases.enum'
import { Player } from '@/models/player.model'

const gamestateStore = gamestate()
const lobbyStore = lobby()

const kickPlayer = (player: Player) => {
  lobbyService.kickPlayer({room: lobbyStore.currentRoom, player: player})
}

const leaveRoom = () => {
  lobbyService.leaveRoom({room: lobbyStore.currentRoom, player: gamestateStore.currentPlayer})
}
</script>

<style scoped lang="scss">
.lobby__list-controls {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.lobby__create-controls, .lobby__list-controls {
  display: flex;
  justify-content: space-between;
}

.lobby__game-player {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.kick {
  cursor: pointer;
  width: 10px;
  transition: fill 0.3s ease;

  &:hover {
    fill: red;
  }
}
</style>
