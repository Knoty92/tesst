<template>
  <canvas id="pixi"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, onBeforeUnmount } from 'vue'

import * as PIXI from 'pixi.js'

import * as TWEEN from 'tween.js'

import { Viewport } from 'pixi-viewport'


  

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

    /*app.ticker.add(() => {
      point.x += 1
    })*/

    const pos = viewport.toWorld(e.data.global)

    point.position.set(pos.x, pos.y)

    console.log(point)

    /*setTimeout(() => {
    
    }, 5000)

    const viewportCoordinates = e.data.global

    console.log(viewportCoordinates)
    point.position = viewportCoordinates.x
    point.position.y = viewportCoordinates.y

    console.log(point)*/
    
  });

  console.log(graphics)
})


</script>

<style scoped lang="scss">

</style>
