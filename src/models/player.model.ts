import { Graphics, Sprite } from 'pixi.js'

export type Player = {
  id: string
  points?: number
  name: string
  selectedLetter?: string
  sprite?: Sprite
  baseX?: number
  circle?: Graphics
  latestPoints?: number | null
}
