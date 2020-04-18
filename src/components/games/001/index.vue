<template lang="pug">
.othello(:style="bodyStyle")
  .othello__header
    .othello__turn(:class="'-' + turn")
      | {{ turn }} turn
    .othello__counts
      span.-black {{ stoneCounts.black }}
      span.-versus(data-inverted="-") -
      span.-white {{ stoneCounts.white }}
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
      turn: store.turn,
      stoneCounts: store.stoneCounts
    }
  }
})
</script>

<style lang="stylus" scoped>
.othello
  background-color: #009a57
  font-weight: bold
  &__header
    height: 70px
    padding: 20px 50px 0
    display: flex
  &__turn
    font-size: 24px
    margin-right: 20px
  &__counts
    font-size: 24px
    display: flex
  .-white
    color: white
  .-black
    color: black
  .-versus
    color: white
    position: relative
    margin: 0 2px
    &:before
      content: attr(data-inverted)
      overflow: hidden
      position: absolute
      left: 0
      top: 0
      width: 50%
      color: black
</style>
