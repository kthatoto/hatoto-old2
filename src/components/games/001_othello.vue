<template lang="pug">
.othello
  h1 othellllllllllo!!!!
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import injectBy from '@/utils/injectBy.ts'
import { gameStoreInjectionKey, GameItem } from '@/stores/game_store.ts'

export default defineComponent({
  setup (_, context) {
    const store = injectBy(gameStoreInjectionKey)
    const gameLink = (game: GameItem) => (`/games/${game.name}`)
    return {
      gameList: store.gameList,
      gameLink
    }
  }
})
</script>

<style lang="stylus" scoped>
.othello
  h1
    color: red
</style>
