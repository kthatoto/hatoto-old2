<template lang="pug">
.games
  .games__list
    nuxt-link.games__item(v-for="(game, number) in ameList" :key="game.number" :to="gameLink(game)")
      .games__number {{ number }}
      .games__name {{ game.name }}
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { buildGameStore, GameItem } from '@/stores/game_store.ts'

export default defineComponent({
  setup (_, _context) {
    const store = buildGameStore()
    const gameLink = (game: GameItem) => (`/games/${game.name}`)
    return {
      gameList: store.gameList,
      gameLink
    }
  }
})
</script>

<style lang="stylus" scoped>
.games
  itemHeight = 150px
  &__list
    width: 90%
    max-width: 1000px
    display: flex
    justify-content: space-between
    margin: 50px auto 0
  &__item
    width: 30%
    border: 1px solid #ccc
    height: itemHeight
    position: relative
    background-color: #eee
    cursor: pointer
    &:hover .games__number
      visibility: visible
  &__number
    visibility: hidden
    position: absolute
    font-size: 64px
    width: 100%
    height: itemHeight
    line-height: itemHeight
    margin: auto
    text-align: center
    background-color: rgba(0, 0, 0, .5)
    color: white
    z-index: 1
  &__name
    position: absolute
    width: 100%
    background-color: white
    bottom: 0
    padding: 5px
    font-weight: bold
</style>
