<template lang="pug">
.othello(:style="bodyStyle")
  .othello__header
  Board
</template>

<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'

import injectBy from '@/utils/injectBy.ts'
import { gameStoreInjectionKey, GameItem } from '@/stores/game_store.ts'
import { buildStore, storeInjectionKey } from './store'
import Board from './board.vue'

export default defineComponent({
  components: { Board },
  setup (_, _context) {
    const gameStore = injectBy(gameStoreInjectionKey)
    const store = buildStore()
    provide(storeInjectionKey, store)

    const gameName: 'othello' = 'othello'
    const game: GameItem | null = gameStore.findGame(gameName)
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
  &__header
    padding-top: 70px
</style>
