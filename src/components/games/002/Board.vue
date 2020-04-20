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
      .square(v-for="(square, x) in squareRow" :key="x" :style="squareStyle" @click="pushSquare(y, x)"
        :class="opening(square) ? '-opened' : '-bulge'")
        template(v-if="opening(square)")
          .mine(v-if="square.mine")
          .number(v-else-if="square.nearMineNumber > 0") {{ square.nearMineNumber }}
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from '@vue/composition-api'

import { storeInjectionKey } from './store'
import DigitalNumber from './DigitalNumber.vue'
import injectBy from '@/utils/injectBy.ts'

export default defineComponent({
  components: { DigitalNumber },
  setup (_, _context) {
    const store = injectBy(storeInjectionKey)

    const boardBodyWidth = ref<number>(0)
    const boardBodyHeight = ref<number>(0)
    const squareWidth = computed<string>(() => {
      return `${boardBodyWidth.value / store.horizontalSquareCount.value}px`
    })
    const squareHeight = computed<string>(() => {
      return `${boardBodyHeight.value / store.verticalSquareCount.value}px`
    })
    const squareStyle = computed<any>(() => {
      return {
        width: squareWidth.value,
        height: squareHeight.value
      }
    })
    const opening = (square: Square) => {
      return square.status === 'open'
    }

    onMounted(() => {
      const bodyElement = document.getElementsByClassName('board__body')[0]
      boardBodyWidth.value = bodyElement.clientWidth
      boardBodyHeight.value = bodyElement.clientHeight
    })

    return {
      startGame: store.startGame,
      boardSquares: store.boardSquares,
      pushSquare: store.pushSquare,
      squareStyle,
      opening
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
  width: 378px
  height: 430px
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
    display: flex
    flex-direction: column
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
    width: 100%
    display: flex
  .square
    width: 100%
    height: 100%
    position: relative
    &.-bulge
      hover(.5)
    &.-opened
      border: 0.1px solid #707070
    .mine
      centering()
      width: 90%
      height: 90%
      background-color: black
      border-radius: 50%
    .number
      centering()
      vertical-align: middle
      text-align: center
</style>
