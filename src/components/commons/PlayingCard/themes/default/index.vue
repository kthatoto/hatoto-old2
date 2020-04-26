<template lang="pug">
.playing-card__default(:class="{'-back': data.back}")
  Front(:data="data")
  Back
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from '@vue/composition-api'

import { Suit, Props } from '../../index.vue'
import Front from './Front.vue'
import Back from './Back.vue'

export default defineComponent({
  components: { Front, Back },
  props: {
    data: { type: Object as PropType<Props>, required: true }
  },
  setup (props: Props, _context) {
    return {}
  }
})
</script>

<style lang="stylus" scoped>
.playing-card__default
  width: 100%
  height: 100%
  transition: transform .3s linear
  transform-style: preserve-3d
  &.-back
    transform: rotateY(180deg)
</style>
