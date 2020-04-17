<template lang="pug">
.othello(:style="bodyStyle")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import injectBy from '@/utils/injectBy.ts'
import { gameStoreInjectionKey, GameItem } from '@/stores/game_store.ts'

export default defineComponent({
  setup (_, _context) {
    const store = injectBy(gameStoreInjectionKey)
    const gameName: 'othello' = 'othello'
    const game: GameItem | null = store.findGame(gameName)
    if (game === null) throw `${gameName} is not found`
    return {
      bodyStyle: { width: game.width, height: game.height }
    }
  }
})
</script>

<style lang="stylus" scoped>
.othello
  background-color: #009a57
</style>
