<template lang="pug">
.table(@click="turnCards")
  .row(v-for="rank in ranks" :key="rank")
    playing-card(v-for="suit in suits" :suit="suit" :rank="rank" :width="100" :key="suit" :back="back")
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

import PlayingCard from '@/components/commons/PlayingCard/index.vue'

export default defineComponent({
  components: { PlayingCard },
  setup (_, _context) {
    // const suits: string[] = (['spade', 'heart', 'diamond', 'club'])
    // const ranks: number[] = ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
    const suits: string[] = (['spade', 'heart', 'diamond', 'club'])
    const ranks: number[] = ([1, 2])
    const back = ref<boolean>(true)
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
