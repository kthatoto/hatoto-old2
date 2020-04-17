<template lang="pug">
.othello(:style="bodyStyle")
  h1 othellllllllllo!!!!
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import injectBy from '@/utils/injectBy.ts'
import { gameStoreInjectionKey, GameItem } from '@/stores/game_store.ts'

export default defineComponent({
  setup (_, _context) {
    const store = injectBy(gameStoreInjectionKey)
    const game: GameItem = store.findGame('othello')
    return {
      bodyStyle: { width: game.width, height: game.height }
    }
  }
})
</script>

<style lang="stylus" scoped>
.othello
  h1
    color: red
</style>
