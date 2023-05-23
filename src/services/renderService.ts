import { Application, Sprite, Graphics, Texture, Ticker } from 'pixi.js'

import { addPoints } from '@/services/gamestateService'

import { gamestate } from '@/store/game-state/gamestateStore'
import { Player } from '@/models/player.model'
import { Viewport } from 'pixi-viewport'

export const renderBackground = (app: Application) => {
  const backgroundSprite = Sprite.from('assets/background.png')

  backgroundSprite.anchor.set(0.5)
  backgroundSprite.scale.set(0.5)

  backgroundSprite.height = app.screen.height
  backgroundSprite.width = app.screen.width

  backgroundSprite.x = app.screen.width / 2 - 15
  backgroundSprite.y = app.screen.height / 2

  return backgroundSprite
}

export const initSettings = (app: Application) => {
  gamestate().settings.appHeight = app.renderer.height
  gamestate().settings.appWidth = app.renderer.width
  gamestate().settings.bounds = [app.renderer.height - 100, 100]
}

export const initPlayers = (app: Application, viewport: Viewport) => {
  const playerSprite = Texture.from('https://pixijs.io/examples/examples/assets/bunny.png')

  ;(gamestate().players as Player[]).forEach((p: Player, i: number) => {
    p.sprite = new Sprite(playerSprite)
    p.sprite.anchor.set(0.5)
    p.sprite.name = `player_${p.id}`
    p.sprite.x = p.baseX =
      app.renderer.width / 2 +
      (-1 + (2 * i) / (gamestate().players.length - 1)) * gamestate().settings.spaceBetween
    p.sprite.y = gamestate().settings.bounds[0]

    viewport.addChild(p.sprite)

    Ticker.shared.add(() => {
      if (p.sprite) {
        p.sprite.x +=
          (p.baseX +
            (gamestate().settings.appWidth / 2 - p.baseX) *
              (p.points / gamestate().settings.maxPoints) -
            p.sprite.x) *
          gamestate().settings.speed
        p.sprite.y +=
          (gamestate().settings.bounds[0] +
            (gamestate().settings.bounds[1] - gamestate().settings.bounds[0]) *
              (p.points / gamestate().settings.maxPoints) -
            p.sprite.y) *
          gamestate().settings.speed

        p.sprite.rotation += p.points === gamestate().settings.maxPoints ? 0.1 : 0

      }
    })

    //dev

    p.circle = new Graphics()
    p.circle.beginFill(0xff0000)
    p.circle.drawCircle(p.baseX, gamestate().settings.bounds[0] + 50, 15)
    p.circle.endFill()
    p.circle.interactive = true

    p.circle.on('click', () => {
      addPoints(p, Math.floor(Math.random() * 50))
    })

    app.stage.addChild(p.circle)
  })
}
