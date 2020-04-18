<template lang="pug">
.board
  .squares-row(v-for="(squaresRow, y) in boardSquares" :key="y")
    .square(v-for="(square, x) in squaresRow" :key="x")
      .stone.-circle(v-if="square.status !== 'empty'" :class="square.status")
      .puttable(v-else-if="puttable(square)" @click="putStone(y, x)" @click.stop)
        .-circle
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { storeInjectionKey, Square } from './store'
import injectBy from '@/utils/injectBy.ts'

export default defineComponent({
  setup (_, _context) {
    const store = injectBy(storeInjectionKey)
    const putStone = (y: number, x: number) => {
      const square = store.boardSquares.value[y][x]
      if (!puttable(square)) return
      store.putStone(y, x)
    }

    const puttable = (square: Square) => (square.puttable && store.isYourTurn.value)

    return {
      boardSquares: store.boardSquares,
      puttable,
      putStone
    }
  }
})
</script>

<style lang="stylus" scoped>
.board
  width: 400px
  height: 400px
  border: 1px solid black
  margin: auto
  .squares-row
    width: 100%
    display: flex
  .square
    width: 50px
    height: 50px
    border: 1px solid black
    position: relative
    .-circle
      position: absolute
      margin: auto
      top: 0
      left: 0
      right: 0
      bottom: 0
      border-radius: 50%
  .stone
    width: 40px
    height: 40px
    &.black
      background-color: black
    &.white
      background-color: white
  .puttable
    cursor: pointer
    width: 100%
    height: 100%
    &:hover
      opacity: 0.8
    .-circle
      width: 10px
      height: 10px
      background-color: #d9534f
      border-radius: 50%
</style>
