<template>
    <div class="lobby__list">
      <div class="lobby__list-controls">
        <label>
          Přezdívka
          <input type="text" placeholder="Přezdívka" v-model="username" class="base-input d-block" />
        </label>
        <label>
          Hledej
          <input type="text" placeholder="Název místnosti" class="base-input d-block" />
        </label>
        <button @click="gamestateStore.phase = Phases.LOBBYCREATE" class="ml-auto base-button">nová místnost</button>
      </div>
      <div class="lobby__list-list mt-20">
        <div class="lobby__list-h">
          <span class="lobby__list-r1">Název místnosti</span>
          <span class="lobby__list-r2">Počet hráčů</span>
          <span class="lobby__list-r3">Max bodů</span>
        </div>
        <div class="lobby__list-r" v-for="(room, index) in lobbyStore.rooms" :key="index" @click="joinRoom(room)">
          <span class="lobby__list-r1">{{ room.name }}</span>
          <span class="lobby__list-r2">{{ room.players.length }}</span>
          <span class="lobby__list-r3">{{ room.maxPoints }}</span>
        </div>
      </div>
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

watch(username, (value) => {
  if (value) {
    localStorage.setItem('username', username.value ? username.value : '');
  }
})

onMounted(() => {
  gamestateStore.currentPlayer.name = username.value

  lobbyService.getRooms()
})

const joinRoom = (room: Room) => {
  lobbyService.joinRoom({room: room, player: gamestateStore.currentPlayer})
}
</script>

<style scoped lang="scss">
.lobby {
    background: white;
    position: absolute;
    width: calc(100% - 20rem);
    max-width: 100rem;
    height: 50rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: solid 5px $primary;
    border-radius: 10px;
    padding: 3rem;
}

.lobby__list-controls {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.lobby__list-controls {
  display: flex;
  justify-content: space-between;
}

.lobby__list-list {
  margin: 20px -10px;
}

.lobby__list-r {
  display: flex;
  padding: 10px;
  cursor: pointer;
  background: $blank;
  transition: background 0.3s ease;

  &:hover {
    background: #f8f8f8;
  }
}

.lobby__list-h {
  display: flex;
  padding: 0 10px;
  font-weight: bold;
}

.lobby__list-r1 {
  flex: 1;
}

.lobby__list-r2, .lobby__list-r3 {
  flex: 0 0 120px;
  text-align: center;
}
</style>
