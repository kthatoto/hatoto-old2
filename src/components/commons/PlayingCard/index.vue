<template lang="pug">
.playing-card(:style="cardStyle")
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
    const validate = () => {
      const { width, height, theme, suit, rank, joker } = props
      if (joker && (suit !== '' || rank !== 0))
        throw new Error('`joker` can\'t have `rank` or `suit`')
      if (rank < 0 || 13 < rank)
        throw new Error('`rank` is invalid value')
      if (width < 0 || height < 0)
        throw new Error('`width` and `height` can\'t be negative value')
      if (width > 0 && height > 0)
        throw new Error('both `width` and `height` can\'t be inputted as props')
    }
    validate()

    const dh: number = 178 // default height
    const dw: number = 116 // default width
    const cardStyle = computed<any>(() => {
      const { width, height } = props
      if (width === 0 && height === 0)
        return { width: `${dw}px`, height: `${dh}px`, fontSize: '100px' }
      if (width === 0 && height > 0)
        return { width: `${dw * height / dh}px`, height: `${height}px`, fontSize: `${100 * height / dh}px` }
      if (width > 0 && height === 0)
        return { width: `${width}px`, height: `${dh * width / dw}px`, fontSize: `${100 * width / dw}px` }
      return {}
    })

    return {
      data: props,
      cardStyle
    }
  }
})
</script>

<style lang="stylus" scoped>
.playing-card
  display: inline-block
  position: relative
  user-select: none
  perspective: 1000px
</style>
