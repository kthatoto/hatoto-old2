<template lang="pug">
.othello(:style="bodyStyle")
  .othello__header
    .othello__turn(:class="'-' + turn")
      | {{ turn }}'s turn
  Board
</template>

<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'

import { buildStore, storeInjectionKey } from './store'
import Board from './board.vue'
import injectBy from '@/utils/injectBy.ts'
import { gameStoreInjectionKey, GameItem } from '@/stores/game_store.ts'

export default defineComponent({
  components: { Board },
  setup (_, _context) {
    const gameStore = injectBy(gameStoreInjectionKey)
    const store = buildStore()
    provide(storeInjectionKey, store)

    const game: GameItem = gameStore.findGame('othello')
    return {
      bodyStyle: { width: game.width, height: game.height },
      turn: store.turn
    }
  }
})
</script>

<style lang="stylus" scoped>
.othello
  background-color: #009a57
  &__header
    height: 70px
    padding: 20px 50px 0
    display: flex
  &__turn
    font-weight: bold
    font-size: 24px
    &.-white
      color: white
    &.-black
      color: black
</style>
