<template lang="pug">
.playing-card(:style="cardStyle")
  .playing-card__frame(:class="{'-back': back}")
    .playing-card__inner(:style="innerStyle")
      DefaultTheme(v-if="theme === 'default'" :data="data")
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api'

import DefaultTheme from './themes/default/index.vue'

export type Suit = 'spade' | 'heart' | 'diamond' | 'club' | ''
type Theme = 'default'
export interface Props {
  width: number
  height: number
  theme: string
  suit: Suit
  rank: number
  joker: boolean
  back: boolean
}

export default defineComponent({
  components: { DefaultTheme },
  props: {
    width: { type: Number, required: false, default: 0 },
    height: { type: Number, required: false, default: 0 },
    theme: { type: String, reuired: false, default: 'default' },
    suit: { type: String, required: false, default: '' },
    rank: { type: Number, required: false, default: 0 },
    joker: { type: Boolean, required: false, default: false },
    back: { type: Boolean, required: false, default: false }
  },
  setup (props: Props, _context) {
    const { width, height, theme, suit, rank, joker } = props
    if (joker && (suit !== '' || rank !== 0))
      throw new Error('`joker` can\'t have `rank` or `suit`')
    if (width < 0 || height < 0)
      throw new Error('`width` or `height` can\'t be negative value')
    if (rank < 0 || 13 < rank)
      throw new Error('`rank` is invalid value')

    const dh: number = 178 // default height
    const dw: number = 116 // default width
    const cardStyle = computed<any>(() => {
      if (width === 0 && height === 0)
        return { width: `${dw}px`, height: `${dh}px` }
      if (width === 0 && height > 0)
        return { width: `${dw * height / dh}px`, height: `${height}px` }
      if (width > 0 && height === 0)
        return { width: `${width}px`, height: `${dh * width / dw}px` }
      if (width > 0 && height > 0) {
        return { width: `${width}px`, height: `${height}px` }
      }
      return {}
    })
    const innerStyle = computed<any>(() => {
      if (width === 0 && height === 0)
        return {}
      if (width === 0 && height > 0)
        return { transform: `scale(${height / dh})` }
      if (width > 0 && height === 0)
        return { transform: `scale(${width / dw})` }
      if (width > 0 && height > 0) {
        return { transform: `scaleX(${width / dw}) scaleY(${height / dh})` }
      }
      return {}
    })

    return {
      data: props,
      cardStyle,
      innerStyle
    }
  }
})
</script>

<style lang="stylus" scoped>
.playing-card
  display: inline-block
  position: relative
  perspective: 1000px
  user-select: none
  &__frame
    width: 100%
    height: 100%
    border: 1px solid #999
    border-radius: 4%
    transition: transform .3s linear
    backface-visibility: hidden
    transform-style: preserve-3d
    &.-back
      transform: rotateY(180deg)
  &__inner
    transform-origin: top left
    position: relative
    width: calc(116px - 1px)
    height: calc(178px - 1px)
    margin: 0
</style>
