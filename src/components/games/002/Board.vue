<template lang="pug">
.board.-bulge
  .board__header.-dent
    .mines-rest
      digital-number(:number="9" :height="36")
      digital-number(:number="8" :height="36")
      digital-number(:number="7" :height="36")
    .start-button
    .timer
      digital-number(:number="9" :height="36")
      digital-number(:number="8" :height="36")
      digital-number(:number="7" :height="36")
  .board__body.-dent
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { storeInjectionKey } from './store'
import DigitalNumber from './DigitalNumber.vue'
import injectBy from '@/utils/injectBy.ts'

export default defineComponent({
  components: { DigitalNumber },
  setup (_, _context) {
    const store = injectBy(storeInjectionKey)

    return {
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
  width: 400px
  height: 400px
  margin: auto
  &__header
    margin: 10px
    width: calc(100% - 20px)
    height: 40px
    display: flex
    justify-content: space-between
  &__body
    margin: 10px
    width: calc(100% - 20px)
    height: calc(100% - 72px)
  .mines-rest, .timer
    display: flex
</style>
