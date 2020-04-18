<template lang="pug">
.board
  .squares-row(v-for="(squaresRow, i) in boardSquares" :key="i")
    .square(v-for="(square, j) in squaresRow" :key="j" @click="putStone(i, j)" :class="{'-puttable': square.puttable}")
      .stone(v-if="square.status !== 'empty'" :class="square.status")
      .puttable(v-else-if="square.puttable")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { storeInjectionKey } from './store'
import injectBy from '@/utils/injectBy.ts'

export default defineComponent({
  setup (_, _context) {
    const store = injectBy(storeInjectionKey)
    const putStone = (y: number, x: number) => {
      const square = store.boardSquares.value[y][x]
      if (square.status !== 'empty' || !square.puttable) return
      store.putStone(y, x)
    }

    return {
      boardSquares: store.boardSquares,
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
    &.-puttable
      cursor: pointer
      &:hover
        opacity: 0.8
    > div
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
    width: 10px
    height: 10px
    background-color: #d9534f
    border-radius: 50%
</style>
