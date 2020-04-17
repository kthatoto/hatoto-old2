<template lang="pug">
.game
  nuxt-link.back(to="/games")
    icon.icon.-r(name="chevron-left")
    span back to games
  h1 {{ gameName }}
  .game__screen
    .game__body(:is="gameName")
</template>

<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'

import { buildGameStore, gameStoreInjectionKey } from '@/stores/game_store.ts'

export default defineComponent({
  components: {
    othello: () => import('@/components/games/001_othello.vue')
  },
  setup (_, context) {
    const store = buildGameStore()
    provide(gameStoreInjectionKey, store)
    const gameName: string = context.root.$route.params.game
    return { gameName }
  }
})
</script>

<style lang="stylus" scoped>
.game
  padding: 50px 20px
  .back
    display: inline-block
    margin-bottom: 20px
  &__screen
    border: 1px solid #ccc
    margin: auto
</style>
