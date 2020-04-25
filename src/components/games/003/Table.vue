<template lang="pug">
.table
  playing-card(suit="spade" :rank="13" :width="50")
  playing-card(suit="spade" :rank="13" :width="300")
  playing-card(suit="diamond" :rank="11")
  playing-card(suit="club" :rank="12" :height="200" :width="200")
  playing-card(suit="spade" :rank="10")
  playing-card(suit="spade" :rank="1" :height="150" :width="150")

  .row(v-for="rank in ranks")
    playing-card(v-for="suit in suits" :suit="suit" :rank="rank" :width="200")
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

import PlayingCard from '@/components/commons/PlayingCard/index.vue'

export default defineComponent({
  components: { PlayingCard },
  setup (_, _context) {
    const suits: string[] = (['spade', 'heart', 'diamond', 'club'])
    const ranks: number[] = ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
    return { suits, ranks }
  }
})
</script>

<style lang="stylus" scoped>
.table
  overflow-y: scroll
  >>> .playing-card
    margin: 5px
</style>
