<template>
  <canvas id="pixi"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, onBeforeUnmount } from 'vue'

import * as PIXI from 'pixi.js'

import { Viewport } from 'pixi-viewport'
import { Ticker, TickerCallback } from 'pixi.js'


  

onMounted(() => {

  const app = new PIXI.Application({
    view: document.getElementById('pixi') as HTMLCanvasElement,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x8fa8b4
  })

  const renderer = new PIXI.autoDetectRenderer(800,600);

  document.body.appendChild(renderer.view);

  //app.stage.hitArea = new Rectangle(0, 0, app.renderer.width/app.renderer.resolution, app.renderer.height/app.renderer.resolution);

  app.stage.interactive = true;

  // create viewport
  const viewport = new Viewport({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    worldWidth: window.innerWidth,
    worldHeight: window.innerHeight,
    
    interaction: app.renderer.plugins.interaction, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
  })

  // activate plugins
  viewport.decelerate();
  app.stage.addChild(viewport)

  const onClick = (event) => {
    console.log(event)
  }

  const graphics = new PIXI.Graphics();

  graphics.beginFill(0xDE3249);
  graphics.drawRect(500 - 150 / 2, 500 - 110 / 2, 150, 110);
  graphics.endFill();

  graphics.interactive = true;
  graphics.cursor = 'pointer';
  graphics.zIndex = 10
  graphics.buttonMode = true;


  app.stage.addChild(graphics);

  const point = new PIXI.Graphics();

  point.beginFill(0x000000);
  point.drawCircle(0, 0, 5).position.set(100, 100)
  point.endFill();

  point.interactive = true;
  point.cursor = 'pointer';
  point.zIndex = 12

  app.stage.addChild(point);

  viewport.on('pointerdown', (e) => {

    const velocity = 1

    console.log(point.position)

    const currentPos = {
      x: point.position.x,
      y: point.position.y
    }
    const targetPos = viewport.toWorld(e.data.global)

    const distance = Math.sqrt(Math.pow(Math.abs(currentPos.x - targetPos.x), 2) + Math.pow(Math.abs(currentPos.y - targetPos.y), 2))

    const ratio = {
      x: Math.abs(currentPos.x - targetPos.x) / (Math.abs(currentPos.x - targetPos.x) + Math.abs(currentPos.y - targetPos.y)),
      y: Math.abs(currentPos.y - targetPos.y) / (Math.abs(currentPos.x - targetPos.x) + Math.abs(currentPos.y - targetPos.y))
    }

    const speed = velocity / Math.sqrt(ratio.x * ratio.x + ratio.y * ratio.y);

    console.log(distance / speed)

    const ticker = new PIXI.Ticker

    let travelled = 0

    ticker.add(() => {
      if (targetPos.x >= currentPos.x) {
      point.x += speed * ratio.x
      } else {
        point.x -= speed * ratio.x
      }

      if (targetPos.y >= currentPos.y) {
        point.y += speed * ratio.y
      } else {
        point.y -= speed * ratio.y
      }

      travelled += 1

      if (travelled >= distance) {
        ticker.destroy()
      }
    })

    ticker.start()
    
  });

  const moveObject = (targetPos: {x: number, y: number}, currentPos:  {x: number, y: number}, speed: number, ratio: {x: number, y: number}): void => {
      const ticker = new PIXI.Ticker

      ticker.add(() => {
        if (targetPos.x >= currentPos.x) {
        point.x += speed * ratio.x
        } else {
          point.x -= speed * ratio.x
        }

        if (targetPos.y >= currentPos.y) {
          point.y += speed * ratio.y
        } else {
          point.y -= speed * ratio.y
        }
      })
  }

  console.log(graphics)
})


</script>

<style scoped lang="scss">

</style>
