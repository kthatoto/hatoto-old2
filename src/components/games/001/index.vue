<template lang="pug">
.othello
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

export default defineComponent({
  components: { Board },
  setup (_, _context) {
    const store = buildStore()
    provide(storeInjectionKey, store)

    return {
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
    position: relative
  .-white
    color: white
  .-black
    color: black
  &__turn
    font-size: 24px
    margin-right: 20px
  &__counts
    font-size: 24px
    position: absolute
    width: 70px
    display: flex
    justify-content: center
    margin: auto
    top: 20px
    left: 0
    right: 0
    .-white
      width: 30px
      text-align: left
    .-black
      width: 30px
      text-align: right
    .-versus
      width: 10px
      transform: scaleX(1.5)
      color: white
      position: relative
      margin: 0 4px
      &:before
        content: attr(data-inverted)
        overflow: hidden
        position: absolute
        left: 0
        top: 0
        width: 50%
        color: black
</style>
