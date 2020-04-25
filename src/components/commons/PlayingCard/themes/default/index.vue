<template lang="pug">
.playing-card__default
  Front(:data="data")
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

import { Suit } from '../../index.vue'
import Front from './Front.vue'
import Back from './Back.vue'

export interface Props {
  suit: Suit
  rank: number
  joker: boolean
  back: boolean
}

export default defineComponent({
  components: { Front, Back },
  props: {
    suit: { type: String, required: false, default: '' },
    rank: { type: Number, required: false, default: 0 },
    joker: { type: Boolean, required: false, default: false },
    back: { type: Boolean, required: false, default: false }
  },
  setup (props: Props, _context) {
    const data = computed<Props>(() => props)

    return { data }
  }
})
</script>

<style lang="stylus" scoped>
.playing-card
  &__default
    height: 100%
</style>
