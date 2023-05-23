import { Player } from '@/models/player.model'

export type Room = {
  id: string,
  host: string,
  name: string,
  maxPoints: number,
  password: string,
  players: Player[]
}

