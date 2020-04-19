<template lang="pug">
.board.-bulge
  .board__header.-dent
    .mines-rest
      digital-number(:number="9" :height="36")
      digital-number(:number="8" :height="36")
      digital-number(:number="7" :height="36")
    .start-button.-bulge(@click="startGame")
    .timer
      digital-number(:number="9" :height="36")
      digital-number(:number="8" :height="36")
      digital-number(:number="7" :height="36")
  .board__body.-dent
    .square-row(v-for="(squareRow, y) in boardSquares" :key="y")
      .square.-bulge(v-for="(square, x) in squareRow" :key="x")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { storeInjectionKey } from './store'
import DigitalNumber from './DigitalNumber.vue'
import injectBy from '@/utils/injectBy.ts'

export default defineComponent({
  components: { DigitalNumber },
  setup (_, _context) {
    const store = injectBy(storeInjectionKey)

    return {
      startGame: store.startGame,
      boardSquares: store.boardSquares
    }
  }
})
</script>

<style lang="stylus" scoped>
.-bulge
  border-top: 2px solid white
  border-left: 2px solid white
  border-right: 2px solid #707070
  border-bottom: 2px solid #707070
.-dent
  border-top: 2px solid #707070
  border-left: 2px solid #707070
  border-right: 2px solid white
  border-bottom: 2px solid white
.board
  width: 400px
  height: 400px
  margin: auto
  headerHeight = 40px
  &__header
    margin: 10px
    width: calc(100% - 20px)
    height: headerHeight
    display: flex
    justify-content: space-between
  &__body
    margin: 10px
    width: calc(100% - 20px)
    height: calc(100% - 72px)
  .mines-rest, .timer
    display: flex
  .start-button
    position: absolute
    height: 'calc(%s - 4px)' % headerHeight
    width: 'calc(%s - 4px)' % headerHeight
    margin: auto
    left: 0
    right: 0
  .square-row
  .sqaure
    width: 30px
    height: 30px
</style>
