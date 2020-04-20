<template lang="pug">
.digital-number(:style="style")
  .number.top(:class="topClass")
    .line.-topLeft
    .line.-topRight
    .line.-bottomLeft
    .line.-bottomRight
  .number.bottom(:class="bottomClass")
    .line.-topLeft
    .line.-topRight
    .line.-bottomLeft
    .line.-bottomRight
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

interface Props {
  number: number | '-'
  height: number
}

export default defineComponent({
  props: {
    number: { type: [Number, String], require: true },
    height: { type: Number, require: true }
  },
  setup (props: Props, _context) {
    const style = computed<any>(() => ({
      transform: `scale(${props.height / 36})`
    }))
    const topClass = computed<any>(() => {
      if (props.number === 0) return ['-top', '-left', '-right']
      if (props.number === 1) return ['-right']
      if (props.number === 2) return ['-top', '-right', '-bottom']
      if (props.number === 3) return ['-top', '-right', '-bottom']
      if (props.number === 4) return ['-left', '-bottom', '-right']
      if (props.number === 5) return ['-top', '-left', '-bottom']
      if (props.number === 6) return ['-top', '-left', '-bottom']
      if (props.number === 7) return ['-top', '-right']
      if (props.number === 8) return ['-top', '-right', '-left', '-bottom']
      if (props.number === 9) return ['-top', '-right', '-left', '-bottom']
      if (props.number === '-') return ['-bottom']
      throw new Error('number must be 1 digit')
    })
    const bottomClass = computed<any>(() => {
      if (props.number === 0) return ['-left', '-right', '-bottom']
      if (props.number === 1) return ['-right']
      if (props.number === 2) return ['-top', '-left', '-bottom']
      if (props.number === 3) return ['-top', '-right', '-bottom']
      if (props.number === 4) return ['-top', '-right']
      if (props.number === 5) return ['-top', '-right', '-bottom']
      if (props.number === 6) return ['-top', '-right', '-left', '-bottom']
      if (props.number === 7) return ['-right']
      if (props.number === 8) return ['-top', '-right', '-left', '-bottom']
      if (props.number === 9) return ['-top', '-right', '-bottom']
      if (props.number === '-') return ['-top']
      throw new Error('number must be 1 digit')
    })
    return {
      style,
      topClass,
      bottomClass
    }
  }
})
</script>

<style lang="stylus" scoped>
.digital-number
  activeRed = #fe0024
  notActiveRed = #5c0108
  background-color: black
  padding: 3px
  display: flex
  flex-direction: column
  overflow: hidden
  height: 36px
  width: calc(36px / 1.6)
  transform-origin: top left
  .number
    height: 50%
    border: 4px solid notActiveRed
    position: relative
    &.top
      border-radius: 10% 10% 0 0
      border-bottom-width: 2px
      .line
        &.-topLeft
          transform: translate(-60%, -200%) rotate(45deg)
        &.-topRight
          transform: translate(20%, -200%) rotate(135deg)
        &.-bottomLeft
          transform: translate(-60%, 900%) rotate(155deg)
        &.-bottomRight
          transform: translate(20%, 850%) rotate(25deg)
    &.bottom
      border-radius: 0 0 10% 10%
      border-top-width: 2px
      .line
        &.-topLeft
          transform: translate(-60%, -120%) rotate(25deg)
        &.-topRight
          transform: translate(20%, -90%) rotate(155deg)
        &.-bottomLeft
          transform: translate(-60%, 900%) rotate(135deg)
        &.-bottomRight
          transform: translate(20%, 900%) rotate(45deg)
    &.-top
      border-top-color: activeRed
    &.-left
      border-left-color: activeRed
    &.-right
      border-right-color: activeRed
    &.-bottom
      border-bottom-color: activeRed
  .line
    width: 150%
    height: 1px
    border: 0.5px solid black
    position: absolute
    z-index: 1
</style>
