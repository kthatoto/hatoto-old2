<template lang="pug">
.table
  playing-card(suit="diamond" :rank="2" :width="200")
  playing-card(suit="diamond" :rank="2" :height="200")
  playing-card(suit="diamond" :rank="2")
  playing-card(suit="diamond" :rank="2" :height="200" :width="200")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import PlayingCard from '@/components/commons/PlayingCard/index.vue'

export default defineComponent({
  components: { PlayingCard },
  setup (_, _context) {
    return {}
  }
})
</script>

<style lang="stylus" scoped>
</style>
