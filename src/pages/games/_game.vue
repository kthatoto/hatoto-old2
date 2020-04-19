<template lang="pug">
.game
  .game__header(:style="{ width: bodyStyle.width }")
    nuxt-link.back(to="/games")
      icon.icon.-r(name="chevron-left")
      span back to games
    h1
      span {{ game.name }}
      .buttons
        icon.icon.-large.-hover.-rr(name="question-circle" @click.native="openHowtoplay")
        icon.icon.-large.-hover(name="list" @click.native="openChangelog")
  .game__body(:is="game.name" :style="bodyStyle")
  el-dialog(title="Changelog" :visible.sync="showingChangelog")
    vue-markdown.markdown(:source="changelog")
  el-dialog(title="How To Play" :visible.sync="showingHowtoplay" custom-class="-howtoplay")
    vue-markdown.markdown(:source="howtoplay")
    .howtoplay-console(slot="footer")
      el-button.prev-button(v-show="howtoplayPage > 1" @click="moveHowtoplayPage(-1)")
        icon.icon(name="chevron-left")
      .pagination {{ howtoplayPage }} / {{ howtoplayTotalPage }}
      el-button.next-button(v-show="howtoplayPage < howtoplayTotalPage" @click="moveHowtoplayPage(1)")
        icon.icon(name="chevron-right")
</template>

<script lang="ts">
import { defineComponent, provide, ref, reactive, onMounted } from '@vue/composition-api'

import { buildGameStore, gameStoreInjectionKey, GameItem } from '@/stores/game_store.ts'

export default defineComponent({
  components: {
    othello: () => import('@/components/games/001/index.vue'),
    minesweeper: () => import('@/components/games/002/index.vue')
  },
  setup (_, context) {
    const gameStore = buildGameStore()
    provide(gameStoreInjectionKey, gameStore)

    const gameName: string = context.root.$route.params.game
    const game: GameItem = gameStore.findGame(gameName)

    const changelog = ref<string>('')
    const showingChangelog = ref<boolean>(false)
    const openChangelog = (): void => { showingChangelog.value = true }

    const howtoplay = ref<string>('')
    const showingHowtoplay = ref<boolean>(false)
    const howtoplayPage = ref<number>(1)
    const openHowtoplay = async () => {
      howtoplayPage.value = 1
      howtoplay.value = (await import(`@/components/games/${game.numberKey}/assets/howtoplay/${howtoplayPage.value}.md`)).default
      showingHowtoplay.value = true
    }
    const howtoplayTotalPage: number = game.howtoplayTotalPage
    const moveHowtoplayPage = async (diff: number) => {
      howtoplayPage.value += diff
      howtoplay.value = (await import(`@/components/games/${game.numberKey}/assets/howtoplay/${howtoplayPage.value}.md`)).default
    }

    const bodyStyle = reactive<any>({
      width: game.width,
      height: game.height,
      transform: 'scale(1.0)'
    })
    onMounted(async () => {
      changelog.value = (await import(`@/components/games/${game.numberKey}/assets/changelog.md`)).default
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
      openChangelog,
      howtoplay,
      showingHowtoplay,
      openHowtoplay,
      howtoplayPage,
      howtoplayTotalPage,
      moveHowtoplayPage
    }
  }
})
</script>

<style lang="stylus" scoped>
.game
  padding: 50px 20px 0
  max-height: 90vh
  overflow: hidden
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
  .markdown
    markdown()
  .howtoplay-console
    position: relative
    height: 40px
    width: 100%
    left: 0
    right: 0
    .pagination
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      margin: auto
      width: 50px
      height: 20px
      font-weight: bold
      font-size: 16px
      text-align: center
    .prev-button, .next-button
      width: 70px
      height: 40px
      position: absolute
      margin: auto
      top: 0
      bottom: 0
    .prev-button
      left: 30px
    .next-button
      right: 30px
</style>

<style lang="stylus">
.el-dialog
  width: 500px
  height: 50vh
  &__body
    scroll-shadow()
    padding: 10px 20px
    height: calc(100% - 70px)
    overflow-y: scroll
    border-top: 1px solid #ccc
    border-bottom: 1px solid #ccc
    word-break: break-word
  &__title
    font-weight: bold
    font-size: 20px
  &.-howtoplay
    .el-dialog__body
      height: calc(100% - 120px)
      position: relative

@media (max-width: 540px)
  .el-dialog
    width: 90%
    &__wrapper
      width: 100vw
</style>
