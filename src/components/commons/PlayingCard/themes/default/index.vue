<template lang="pug">
.playing-card__default
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
    data: { type: Object as PropType<Props> }
  },
  setup (props: Props, _context) {
    return {}
  }
})
</script>

<style lang="stylus" scoped>
.playing-card
  &__default
    height: 100%
    position: relative
</style>
