<template>
  <div style="position: fixed; top:0; height:100vh; width:100vw; background:black;">
    <button @click="createRoom()">
      Add
    </button>

    <h1>Rooms</h1>
    <ul>
      <li v-for="room in rooms" @click="joinRoom(room)" :key="room">
        {{ room }}
      </li>
    </ul>

    <template v-if="selectedRoom">
      <h1>Selected room: {{ selectedRoom }}</h1>
      <h1>send message:</h1>
      <input v-model="message" type="text" />
      <button @click="socket.emit('sendMessage', { message, roomName: selectedRoom })">
        send Message
      </button>

      <h1>messages</h1>
      <ul>
        <li v-for="message in messages" :key="message">
          {{ message }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
import { socket } from '@/socket'
import { onMounted, ref, getCurrentInstance } from 'vue'

 /*  TODO: refactor 
 component for rooms before enter the game + store */
const rooms = ref([] as string[])
const selectedRoom = ref(null as string | null)
const message = ref('')
const messages = ref([] as string[])

 /*  TODO: refactor 
 service for sockets */
socket.on('message', (message: string) => {
  messages.value = [...messages.value, message]
})

 /*  TODO: refactor 
 service for sockets */
socket.on('roomCreated', (roomName:string) => {
    rooms.value = [...rooms.value, roomName]
})

onMounted(async ()=>{
    try{

 /*  TODO: refactor 
 init rooms service,
 init providers/api folder */
    await fetch('http://localhost:3000/rooms').then(async (value) => {
        const data = await value.json()
        rooms.value = [...data]
    })
    }
    catch{
        rooms.value = []
    }
})

 /*  TODO: refactor 
 service for sockets */
const joinRoom = (room: string) => {
  socket.emit('joinRoom', room)
  selectedRoom.value = room
}

 /*  TODO: refactor 
 service for sockets */
const createRoom = () => {
    selectedRoom.value =  'Roomka ' + (Math.random() * 10).toFixed(0)
    socket.emit('createRoom',selectedRoom.value)

}
</script>

<style lang="scss"></style>
