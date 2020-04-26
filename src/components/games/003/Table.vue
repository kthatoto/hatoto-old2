<template lang="pug">
.table(@click="turnCards")
  playing-card(suit="spade" :rank="13" :width="50" :back="back")
  playing-card(suit="spade" :rank="13" :width="300" :back="back")
  playing-card(suit="diamond" :rank="11" :back="back")
  playing-card(suit="spade" :rank="10" :back="back")

  .row(v-for="rank in ranks" :key="rank")
    playing-card(v-for="suit in suits" :suit="suit" :rank="rank" :width="200" :key="suit" :back="back")
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

import PlayingCard from '@/components/commons/PlayingCard/index.vue'

export default defineComponent({
  components: { PlayingCard },
  setup (_, _context) {
    const suits: string[] = (['spade', 'heart', 'diamond', 'club'])
    const ranks: number[] = ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
    const back = ref<boolean>(false)
    const turnCards = () => { back.value = !back.value }
    return { suits, ranks, back, turnCards }
  }
})
</script>

<style lang="stylus" scoped>
.table
  overflow-y: scroll
  >>> .playing-card
    margin: 5px
</style>
