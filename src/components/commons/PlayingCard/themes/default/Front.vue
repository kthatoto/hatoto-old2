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
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from '@vue/composition-api'

import { Props } from './index.vue'

export default defineComponent({
  props: {
    data: { type: Object as PropType<Props> }
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
    font-family: 'Impact'
    height: 100%
    position: relative
    &.-red
      color: red
    &.-black
      color: black
    &.-two-digits
      .rank
        transform: scaleX(0.8)
  &__index
    position: absolute
    width: 15px
    text-align: center
    height: 10px
    line-height: 10px
    padding-top: 5px
    .suit
      font-size: large
    &.-top
      top: 5px
      left: 0
    &.-bottom
      bottom: 5px
      right: 0
      transform: rotate(180deg)
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
      font-size: 40px
      &.-top
        top: -10px
        left: 0
      &.-bottom
        bottom: -10px
        right: 0
        transform: rotate(180deg)
  &__suit-item
    position: absolute
    display: inline
    &.-one
      font-size: 100px
      width: 100%
      height: 80%
      text-align: center
      top: 0
      bottom 0
      &.-suit0
        margin: auto
    &:not(.-one)
      font-size: 40px
    &.-two, &.-three
      width: 100%
      text-align: center
      verticalMargin = 20px
      &.-suit0
        top: verticalMargin
      &.-suit1
        bottom: verticalMargin
        transform: rotate(180deg)
    center()
      width: 100%
      text-align: center
      margin: auto
      height: 32%
      top: 0
      bottom: 0
    &.-three
      &.-suit2
        center()
    verticalMargin = 10px
    horizontalMargin = 12px
    &.-four, &.-five, &.-six, &.-seven, &.-eight, &.-nine, &.-ten
      &.-suit0
        top: verticalMargin
        left: horizontalMargin
      &.-suit1
        top: verticalMargin
        right: horizontalMargin
      &.-suit2
        bottom: verticalMargin
        left: horizontalMargin
        transform: rotate(180deg)
      &.-suit3
        bottom: verticalMargin
        right: horizontalMargin
        transform: rotate(180deg)
    &.-five
      &.-suit4
        center()
    leftVerticalCenter()
      height: 32%
      top: 0
      bottom: 0
      margin: auto
      left: horizontalMargin
    rightVerticalCenter()
      height: 32%
      top: 0
      bottom: 0
      margin: auto
      right: horizontalMargin
      transform: rotate(180deg)
    &.-six, &.-seven, &.-eight
      &.-suit4
        leftVerticalCenter()
      &.-suit5
        rightVerticalCenter()
    topCenter()
      width: 100%
      text-align: center
      margin: auto
      top: 35px
    bottomCenter()
      width: 100%
      text-align: center
      margin: auto
      bottom: 35px
      transform: rotate(180deg)
    &.-seven, &.-eight
      &.-suit6
        topCenter()
    &.-eight
      &.-suit7
        bottomCenter()
    &.-nine, &.-ten
      &.-suit4
        left: horizontalMargin
        top: 43px
      &.-suit5
        right: horizontalMargin
        top: 43px
      &.-suit6
        left: horizontalMargin
        bottom: 43px
        transform: rotate(180deg)
      &.-suit7
        right: horizontalMargin
        bottom: 43px
        transform: rotate(180deg)
    &.-nine
      &.-suit8
        center()
    &.-ten
      &.-suit8
        topCenter()
        top: 28px
      &.-suit9
        bottomCenter()
        bottom: 28px
</style>
