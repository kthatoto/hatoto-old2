<template lang="pug">
.playing-card(:style="cardStyle")
  .playing-card__inner(:style="innerStyle")
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from '@vue/composition-api'

type Suit = 'spade' | 'heart' | 'diamond' | 'club' | ''
type Theme = 'default'
interface Props {
  width: number
  height: number
  suit: Suit
  rank: number
  joker: boolean
  theme: string
}

export default defineComponent({
  props: {
    width: { type: Number, required: false, default: 0 },
    height: { type: Number, required: false, default: 0 },
    suit: { type: String, required: false, default: '' },
    rank: { type: Number, required: false, default: 0 },
    joker: { type: Boolean, required: false, default: false },
    theme: { type: String, reuired: false, default: 'default' }
  },
  setup (props: Props, _context) {
    if (props.joker && (props.suit !== '' || props.rank !== 0))
      throw new Error('`joker` can\'t have `rank` or `suit`')
    if (props.width < 0 || props.height < 0)
      throw new Error('`width` or `height` can\'t be negative value')

    const dh: number = 178 // default height
    const dw: number = 116 // default width
    const cardStyle = computed<any>(() => {
      if (props.width === 0 && props.height === 0)
        return { width: `${dw}px`, height: `${dh}px` }
      if (props.width === 0 && props.height > 0)
        return { width: `${dw * props.height / dh}px`, height: `${props.height}px` }
      if (props.width > 0 && props.height === 0)
        return { width: `${props.width}px`, height: `${dh * props.width / dw}px` }
      if (props.width > 0 && props.height > 0) {
        return { width: `${props.width}px`, height: `${props.height}px` }
      }
      return {}
    })
    const innerStyle = computed<any>(() => {
      if (props.width === 0 && props.height === 0)
        return {}
      if (props.width === 0 && props.height > 0)
        return { transform: `scale(${props.height / dh})` }
      if (props.width > 0 && props.height === 0)
        return { transform: `scale(${props.width / dw})` }
      if (props.width > 0 && props.height > 0) {
        return { transform: `scaleX(${props.width / dw}) scaleY(${props.height / dh})` }
      }
      return {}
    })

    return {
      cardStyle,
      innerStyle
    }
  }
})
</script>

<style lang="stylus" scoped>
.playing-card
  border: 1px solid #999
  border-radius: 4%
  display: inline-block
  position: relative
  &__inner
    transform-origin: top left
    position: relative
    width: calc(116px - 1px)
    height: calc(178px - 1px)
    margin: 0
</style>
