<template>
  <canvas id="pixi"></canvas>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Application } from 'pixi.js'
import { Viewport } from 'pixi-viewport'

import { renderBackground, initPlayers, initSettings } from '@/services/renderService'

onMounted(() => {
  const app = new Application({
    view: document.getElementById('pixi') as HTMLCanvasElement,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x8fa8b4
  })

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

  initSettings(app)
  initPlayers(app,viewport)

})
</script>

<style scoped>
#pixi {
  width: 100vw;
  height: 100vh;
}
</style>
