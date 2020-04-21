<template lang="pug">
.games
  nuxt-link.back(to="/")
    icon.icon.-r(name="chevron-left")
    span back to top
  .games__list
    nuxt-link.games__item(v-for="(game, number) in gameList" :key="game.number" :to="gameLink(game)")
      el-card.card(:style="{ backgroundImage: `url(${gameThumbnail(game)})` }")
        .games__name {{ game.name }}
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { buildGameStore, GameItem } from '@/stores/game_store.ts'

export default defineComponent({
  setup (_, _context) {
    const store = buildGameStore()
    const gameLink = (game: GameItem) => (`/games/${game.name}`)
    const gameThumbnail = (game: GameItem) => require(`@/assets/games/thumbnails/${game.thumbnail}`)
    return {
      gameList: store.gameList,
      gameLink,
      gameThumbnail
    }
  }
})
</script>

<style lang="stylus" scoped>
.games
  padding: 50px 20px
  max-width: 600px
  margin: auto
  .back
    display: inline-block
    margin-bottom: 20px
  &__list
    width: 100%
    max-width: 1000px
    margin: 0 auto
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    &::after
      content: ''
      display: block
      width: 30%
  itemHeight = 150px
  &__item
    width: 30%
    height: itemHeight
    position: relative
    cursor: pointer
    margin-bottom: 30px
    .card
      background-repeat: no-repeat
      background-size: cover
      background-position: 50%
      background-color: #eee
      height: 100%
  &__name
    position: absolute
    width: 100%
    background-color: white
    left: 0
    right: 0
    bottom: 0
    padding: 5px
    font-weight: bold

@media (max-width: 540px)
  .games
    max-width: 500px
@media (max-width: 460px)
  .games
    max-width: 380px
    &__item
      width: 45%
</style>
