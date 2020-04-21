<template lang="pug">
.board.-bulge
  .board__header.-dent
    .mines-rest
      digital-number(:number="apparentlyMineNumber.third" :height="36")
      digital-number(:number="apparentlyMineNumber.second" :height="36")
      digital-number(:number="apparentlyMineNumber.first" :height="36")
    .start-button.-bulge(@click="startGame" :class="smileyClass")
    .timer
      digital-number(:number="timer.third" :height="36")
      digital-number(:number="timer.second" :height="36")
      digital-number(:number="timer.first" :height="36")
  .board__body.-dent
    .square-row(v-for="(squareRow, y) in boardSquares" :key="y")
      .square(v-for="(square, x) in squareRow" :key="x" :style="squareStyle" :class="squareClass(square)"
        @click.left="pushSquare(y, x)" @click.right.prevent="putFlag(y, x)" v-longclick="() => putFlag(y, x)")
        .number(v-if="opening(square) && square.nearMineNumber > 0" :class="'-color' + square.nearMineNumber" :style="numberStyle")
          | {{ square.nearMineNumber }}
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from '@vue/composition-api'

import { storeInjectionKey, Square } from './store'
import DigitalNumber from './DigitalNumber.vue'
import injectBy from '@/utils/injectBy.ts'

interface ThreeDigitNumber {
  third: number | '-'
  second: number
  first: number
}

export default defineComponent({
  components: { DigitalNumber },
  setup (_, _context) {
    const store = injectBy(storeInjectionKey)

    const boardBodyWidth = ref<number>(0)
    const boardBodyHeight = ref<number>(0)
    const squareWidth = computed<string>(() => {
      return `${boardBodyWidth.value / store.horizontalSquareNumber.value}px`
    })
    const squareHeight = computed<string>(() => {
      return `${boardBodyHeight.value / store.verticalSquareNumber.value}px`
    })
    const squareStyle = computed<any>(() => {
      return {
        width: squareWidth.value,
        height: squareHeight.value
      }
    })
    const numberStyle = computed<any>(() => {
      return {
        fontSize: `${(parseInt(squareStyle.value.width) * 0.8)}px`,
        lineHeight: squareHeight.value
      }
    })
    const squareClass = (square: Square): string | string[] => {
      if (opening(square)) {
        if (square.mine) return ['-opened', '-mine']
        return '-opened'
      }
      const statuses: string[] = ['-bulge']
      const gameStatus = store.gameStatus.value
      if (gameStatus === 'gameover' || gameStatus === 'clear') statuses.push('-without-react')
      if (square.status === 'flag') statuses.push('-flag')
      return statuses
    }

    const smileyClass = computed<string>(() => {
      if (store.surprised.flag) return '-surprised'
      if (store.gameStatus.value === 'clear') return '-clear'
      if (store.gameStatus.value === 'gameover') return '-gameover'
      return '-normal'
    })

    const opening = (square: Square) => {
      return square.status === 'open'
    }

    const calculateThreeDigitNumber = (n: number): ThreeDigitNumber => {
      if (n > 999) return { third: 9, second: 9, first: 9 }
      if (n < -99) return { third: '-', second: 9, first: 9 }
      if (n >= 0) return { third: Math.floor(n / 100) % 10, second: Math.floor(n / 10) % 10, first: n % 10 }
      if (n < 0) return { third: '-', second: Math.floor(-n / 10) % 10, first: (-n) % 10 }
      return { third: 0, second: 0, first: 0 }
    }
    const timer = computed<ThreeDigitNumber>(() => {
      return calculateThreeDigitNumber(store.timer.count)
    })
    const apparentlyMineNumber = computed<ThreeDigitNumber>(() => {
      return calculateThreeDigitNumber(store.apparentlyMineNumber.value)
    })

    onMounted(() => {
      const bodyElement = document.getElementsByClassName('board__body')[0]
      boardBodyWidth.value = bodyElement.clientWidth
      boardBodyHeight.value = bodyElement.clientHeight
    })

    return {
      startGame: store.startGame,
      boardSquares: store.boardSquares,
      pushSquare: store.pushSquare,
      putFlag: store.putFlag,
      squareStyle,
      numberStyle,
      squareClass,
      smileyClass,
      opening,
      timer,
      apparentlyMineNumber
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
    hover()
    position: absolute
    height: 'calc(%s - 4px)' % headerHeight
    width: 'calc(%s - 4px)' % headerHeight
    margin: auto
    left: 0
    right: 0
    background-size: 80%
    background-position: center
    background-repeat: no-repeat
    &.-normal
      background-image: url('./assets/images/smiley-normal.png')
    &.-surprised
      background-image: url('./assets/images/smiley-surprised.png')
    &.-clear
      background-image: url('./assets/images/smiley-clear.png')
    &.-gameover
      background-image: url('./assets/images/smiley-bad.png')
  .square-row
    width: 100%
    display: flex
  .square
    width: 100%
    height: 100%
    position: relative
    user-select: none
    &.-bulge:not(.-without-react)
      hover(.5)
    &.-opened
      border: 0.1px solid #707070
    &.-mine
      background-color: red
      background-size: 80%
      background-position: center
      background-repeat: no-repeat
      background-image: url('./assets/images/mine.png')
    &.-flag
      background-size: 120% 90%
      background-position: center
      background-repeat: no-repeat
      background-image: url('./assets/images/flag.png')
    .number
      centering()
      monospaced-font()
      font-weight: bold
      vertical-align: middle
      text-align: center
      &.-color1
        color: blue
      &.-color2
        color: green
      &.-color3
        color: red
      &.-color4
        color: navy
      &.-color5
        color: maroon
      &.-color6
        color: teal
      &.-color7
        color: black
      &.-color8
        color: gray
</style>
