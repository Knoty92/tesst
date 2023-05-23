import { defineStore } from 'pinia'
import StoreType from '../storeType.enum'
import { Room } from '@/models/room.model'

export const lobby = defineStore(StoreType.lobby, {
  state: () => {
    return {
      rooms: [] as Room[],
      currentRoom: null as null | Room,
      selectedRoom: null as string | null
    }
  },

  getters: {
  },
})
