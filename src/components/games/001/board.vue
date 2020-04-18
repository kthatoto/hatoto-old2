<template lang="pug">
.board
  .squares-row(v-for="(squaresRow, i) in boardSquares" :key="i")
    .square(v-for="(square, j) in squaresRow" :key="j" @click="putStone(i, j)")
      .stone(v-if="square.status !== 'empty'" :class="square.status")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import injectBy from '@/utils/injectBy.ts'
import { storeInjectionKey } from './store'

export default defineComponent({
  setup(_, _context) {
    const store = injectBy(storeInjectionKey)
    const putStone = (y: number, x: number) => {
      if (store.boardSquares.value[y][x].status !== 'empty') return
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
  .stone
    position: absolute
    width: 40px
    height: 40px
    margin: auto
    top: 0
    left: 0
    right: 0
    bottom: 0
    border-radius: 50%
    &.black
      background-color: black
    &.white
      background-color: white
</style>
