<template lang="pug">
.game
  .game__header(:style="{ width: bodyStyle.width }")
    nuxt-link.back(to="/games")
      icon.icon.-r(name="chevron-left")
      span back to games
    h1
      span {{ game.name }}
      icon.icon.-large.-hover(name="list" @click.native="openChangelog")
  .game__body(:is="game.name" :style="bodyStyle")
  el-dialog(title="Changelog" :visible.sync="showingChangelog")
    span {{ changelog }}
</template>

<script lang="ts">
import { defineComponent, provide, ref, reactive, onMounted } from '@vue/composition-api'

import { buildGameStore, gameStoreInjectionKey, GameItem } from '@/stores/game_store.ts'

export default defineComponent({
  components: {
    othello: () => import('@/components/games/001/index.vue')
  },
  setup (_, context) {
    const gameStore = buildGameStore()
    provide(gameStoreInjectionKey, gameStore)
    const changelog = ref<string>('')
    const showingChangelog = ref<boolean>(false)
    const openChangelog = () => (showingChangelog.value = true)

    const gameName: string = context.root.$route.params.game
    const game: GameItem = gameStore.findGame(gameName)

    const bodyStyle = reactive<any>({
      width: game.width,
      height: game.height,
      transform: 'scale(1.0)'
    })
    onMounted(async () => {
      changelog.value = (await import(`@/assets/games/changelogs/${game.numberKey}.txt`)).default
      if (screen.width <= parseInt(bodyStyle.width) + 40) {
        const gameWidth: number = parseInt(bodyStyle.width)
        const availableWidth: number = screen.width - 40
        bodyStyle.transform = `scale(${availableWidth / gameWidth})`
      }
    })
    return {
      game,
      bodyStyle,
      changelog,
      showingChangelog,
      openChangelog
    }
  }
})
</script>

<style lang="stylus" scoped>
.game
  padding: 50px 20px 0
  .back
    display: inline-block
    margin-bottom: 20px
  h1
    margin-bottom: 10px
    display: flex
    justify-content: space-between
  &__header
    margin: auto
    max-width: calc(100%)
  &__body
    border: 1px solid #ccc
    margin: auto
    transform-origin: top left
</style>

<style lang="stylus">
.el-dialog__body
  span
    white-space: pre-wrap
@media (max-width: 540px)
  .el-dialog
    width: 90%
    &__wrapper
      width: 100vw
</style>
