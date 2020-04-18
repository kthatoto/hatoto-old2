<template lang="pug">
.game
  .game__header(:style="{ width: game.width }")
    nuxt-link.back(to="/games")
      icon.icon.-r(name="chevron-left")
      span back to games
    h1
      span {{ game.name }}
      icon.icon.-large.-hover(name="list" @click.native="openChangelog")
  .game__body(:is="game.name")
  el-dialog(title="Changelog" :visible.sync="showingChangelog")
    span {{ changelog }}
</template>

<script lang="ts">
import { defineComponent, provide, ref, onMounted } from '@vue/composition-api'

import { buildGameStore, gameStoreInjectionKey, GameItem } from '@/stores/game_store.ts'

export default defineComponent({
  components: {
    othello: () => import('@/components/games/001/index.vue')
  },
  setup (_, context) {
    const gameStore = buildGameStore()
    provide(gameStoreInjectionKey, gameStore)
    const gameName: string = context.root.$route.params.game
    const game: GameItem = gameStore.findGame(gameName)
    const changelog = ref<string>("")
    const showingChangelog = ref<boolean>(false)
    const openChangelog = () => (showingChangelog.value = true)
    onMounted(async () => {
      changelog.value = (await import(`@/assets/games/changelogs/${game.numberKey}.txt`)).default
    })
    return {
      game,
      changelog,
      showingChangelog,
      openChangelog
    }
  }
})
</script>

<style lang="stylus" scoped>
.game
  padding: 50px 20px
  .back
    display: inline-block
    margin-bottom: 20px
  h1
    margin-bottom: 10px
    display: flex
    justify-content: space-between
  &__header
    margin: auto
  &__body
    border: 1px solid #ccc
    margin: auto
</style>

<style lang="stylus">
.el-dialog__body
  span
    white-space: pre-wrap
</style>
