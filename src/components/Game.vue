<template>
  <canvas id="pixi"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, onBeforeUnmount } from 'vue'

import { Application, Graphics, Rectangle } from 'pixi.js'
import { Viewport } from 'pixi-viewport'

onMounted(() => {
  const app = new Application({
    view: document.getElementById('pixi') as HTMLCanvasElement,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x8fa8b4
  })

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

  const graphics = new Graphics();

  graphics.beginFill(0xDE3249);
  graphics.drawRect(500, 50, 150, 110);
  graphics.endFill();

  graphics.interactive = true;
  graphics.cursor = 'pointer';
  graphics.zIndex = 10
  graphics.buttonMode = true;


  app.stage.addChild(graphics);

  viewport.on('pointerdown', (e) => {
    console.log(e)
  });

  console.log(graphics)
})


</script>

<style scoped lang="scss">

</style>
