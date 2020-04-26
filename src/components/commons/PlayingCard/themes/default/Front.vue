<template lang="pug">
.playing-card__front(:class="bodyClasses")
  .playing-card__index.-top
    .rank {{ displayingRank }}
    .suit {{ displayingSuit }}
  .playing-card__index.-bottom
    .rank {{ displayingRank }}
    .suit {{ displayingSuit }}
  .playing-card__picture(v-if="displayPicture" :style="pictureStyle")
    .suit.-top {{ displayingSuit }}
    .suit.-bottom {{ displayingSuit }}
  .playing-card__suits(v-else)
    .playing-card__suit-item(v-for="suitClass in suitClasses" :class="suitClass")
      | {{ displayingSuit }}

  // .development
  //   .horizontal-line
  //   .vertical-line
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from '@vue/composition-api'

import { Props } from '../../index.vue'

export default defineComponent({
  props: {
    data: { type: Object as PropType<Props>, required: true }
  },
  setup (props: { data: Props }, _context) {
    const data: Props = props.data
    const { suit, rank, joker, back } = data

    const displayingRank = computed<string>(() => {
      if (rank === 0) return ''
      if (rank === 1) return 'A'
      if (rank === 11) return 'J'
      if (rank === 12) return 'Q'
      if (rank === 13) return 'K'
      return `${rank}`
    })
    const displayingSuit = computed<string>(() => {
      if (suit === 'spade') return '♠︎'
      if (suit === 'heart') return '♥'
      if (suit === 'diamond') return '♦'
      if (suit === 'club') return '♣︎'
      return ''
    })
    const displayPicture = computed<boolean>(() => (11 <= rank))
    const bodyClasses = computed<string[]>(() => {
      const classes: string[] = []
      if (suit === 'spade' || suit === 'club') classes.push('-black')
      if (suit === 'heart' || suit === 'diamond') classes.push('-red')
      if (rank === 10) classes.push('-two-digits')
      return classes
    })
    const pictureStyle = computed<any>(() => {
      if (!displayPicture.value) return {}
      let rankName: string = ''
      if (rank === 11) rankName = 'jack'
      if (rank === 12) rankName = 'queen'
      if (rank === 13) rankName = 'king'
      return {
        backgroundImage: `url(${require(`./images/${rankName}-${suit}.gif`)})`
      }
    })

    const rankNumberToString = (rank: number): string => {
      if (rank === 1) return 'one'
      if (rank === 2) return 'two'
      if (rank === 3) return 'three'
      if (rank === 4) return 'four'
      if (rank === 5) return 'five'
      if (rank === 6) return 'six'
      if (rank === 7) return 'seven'
      if (rank === 8) return 'eight'
      if (rank === 9) return 'nine'
      if (rank === 10) return 'ten'
      if (rank === 11) return 'eleven'
      if (rank === 12) return 'twelve'
      if (rank === 13) return 'thirteen'
      return 'joker'
    }
    const suitClasses = computed<string[][]>(() => {
      if (rank < 1 || 10 < rank) return []
      return [...Array(rank).keys()].map((i: number): string[] => {
        return [`-${rankNumberToString(rank)}`, `-suit${i}`]
      })
    })

    return {
      displayingRank,
      displayingSuit,
      displayPicture,
      bodyClasses,
      pictureStyle,
      suitClasses
    }
  }
})
</script>

<style lang="stylus" scoped>
.playing-card
  &__front
    width: 100%
    height: 100%
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: -1
    backface-visibility: hidden
    font-family: 'arial'
    background-color: white
    border: 1px solid #999
    border-radius: 4%
    &.-red
      color: red
    &.-black
      color: black
    &.-two-digits
      .rank
        transform: scaleX(0.8)
  &__index
    position: absolute
    width: 15%
    text-align: center
    height: 10%
    line-height: 100%
    padding-top: 5%
    font-size: 24%
    &.-top
      left: 0
      top: 0
      .rank
        top: 5%
      .suit
        top: 10%
    &.-bottom
      right: 0
      bottom: 0
      transform: rotate(180deg)
      .rank
        bottom: 5%
      .suir
        bottom: 10%
  &__picture
    border: 1px solid #999
    width: 75%
    height: 80%
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    margin: auto
    background-position: center
    background-size: 100%
    background-repeat: no-repeat
    .suit
      position: absolute
      font-size: 40%
      &.-top
        top: -10%
        left: 0
      &.-bottom
        bottom: -10%
        right: 0
        transform: rotate(180deg)
  &__suit-item
    position: absolute
    display: inline

    verticalEdgeMargin = 4%
    horizontalEdgeMargin = 12%
    centerVerticalThirdMargin = 19%
    sideQuarterMargin = 24%
    tenCenterVerticalMargin = 16%
    centering()
      width: 100%
      text-align: center
      margin: auto
      height: 32%
      top: 0
      bottom: 0
    leftVerticalCentering()
      height: 32%
      top: 0
      bottom: 0
      margin: auto
      left: horizontalEdgeMargin
    rightVerticalCentering()
      height: 32%
      top: 0
      bottom: 0
      margin: auto
      right: horizontalEdgeMargin
      transform: rotate(180deg)
    centerHalfTopCentering()
      width: 100%
      text-align: center
      margin: auto
      top: centerVerticalThirdMargin
    centerHalfBottomCentering()
      width: 100%
      text-align: center
      margin: auto
      bottom: centerVerticalThirdMargin
      transform: rotate(180deg)

    &.-one
      font-size: 100%
      width: 100%
      height: 80%
      text-align: center
      top: 0
      bottom 0
      &.-suit0
        margin: auto
    &:not(.-one)
      font-size: 40%
    &.-two, &.-three
      width: 100%
      text-align: center
      &.-suit0
        top: verticalEdgeMargin
      &.-suit1
        bottom: verticalEdgeMargin
        transform: rotate(180deg)
    &.-three
      &.-suit2
        centering()
    &.-four, &.-five, &.-six, &.-seven, &.-eight, &.-nine, &.-ten
      &.-suit0
        top: verticalEdgeMargin
        left: horizontalEdgeMargin
      &.-suit1
        top: verticalEdgeMargin
        right: horizontalEdgeMargin
      &.-suit2
        bottom: verticalEdgeMargin
        left: horizontalEdgeMargin
        transform: rotate(180deg)
      &.-suit3
        bottom: verticalEdgeMargin
        right: horizontalEdgeMargin
        transform: rotate(180deg)
    &.-five
      &.-suit4
        centering()
    &.-six, &.-seven, &.-eight
      &.-suit4
        leftVerticalCentering()
      &.-suit5
        rightVerticalCentering()

    &.-seven, &.-eight
      &.-suit6
        centerHalfTopCentering()
    &.-eight
      &.-suit7
        centerHalfBottomCentering()

    &.-nine, &.-ten
      &.-suit4
        left: horizontalEdgeMargin
        top: sideQuarterMargin
      &.-suit5
        right: horizontalEdgeMargin
        top: sideQuarterMargin
      &.-suit6
        left: horizontalEdgeMargin
        bottom: sideQuarterMargin
        transform: rotate(180deg)
      &.-suit7
        right: horizontalEdgeMargin
        bottom: sideQuarterMargin
        transform: rotate(180deg)
    &.-nine
      &.-suit8
        centering()
    &.-ten
      &.-suit8
        centerHalfTopCentering()
        top: tenCenterVerticalMargin
      &.-suit9
        centerHalfBottomCentering()
        bottom: tenCenterVerticalMargin

.development
  width: 100%
  height: 100%
  position: relative
  .horizontal-line
    margin: auto
    width: 100%
    height: 0
    border: 1px solid blue
    top: 0
    bottom: 0
    position: absolute
  .vertical-line
    margin: auto
    width: 0
    height: 100%
    border: 1px solid blue
    right: 0
    left: 0
    position: absolute
</style>
