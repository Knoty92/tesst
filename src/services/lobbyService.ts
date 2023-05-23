import { socket, socketFetch } from '@/socket'

import { lobby } from '@/store/lobby/lobbyStore'
import { gamestate } from '@/store/game-state/gamestateStore'

import { Phases } from '@/enums/phases.enum'
import { Room } from '@/models/room.model'
import { Player } from '@/models/player.model'

socket.on('updateLobby', (rooms: Room[]) => {
  lobby().rooms = rooms
})

socket.on('updateRoom', (room: Room) => {
  lobby().currentRoom = room
})

socket.on('joinedRoom', () => {
  gamestate().phase = Phases.LOBBYGAME
})

socket.on('leftRoom', () => {
  lobby().currentRoom = null
  gamestate().phase = Phases.LOBBYLIST
})

socket.on('roomDestroyed', () => {
  lobby().currentRoom = null
  gamestate().phase = Phases.LOBBYLIST
})

socket.on('playerKicked', (room: Room, player: Player) => {
  console.log('kicked: ' + gamestate().currentPlayer.id)
  console.log(player.id)
  if (gamestate().currentPlayer.id === player.id) {
    leaveRoom({ room: room, player: player })
  }
})

const createRoom = (data: {room: Room, player: Player}) => {
  socket.emit('createRoom', data)
}

const joinRoom = (data: {room: Room, player: Player}) => {
  socket.emit('joinRoom', data)
}

const leaveRoom = (data: {room: Room, player: Player}) => {
  console.log(data.room)
  socket.emit('leaveRoom', data)
}

const kickPlayer = (data: {room: Room, player: Player}) => {
  socket.emit('kickPlayer', data)
}

const getRooms = async () => {
  try{
    lobby().rooms = await socketFetch('rooms') as Room[]
    }
    catch{
      lobby().rooms = []
    }
}

export default { createRoom, getRooms, joinRoom, leaveRoom, kickPlayer }