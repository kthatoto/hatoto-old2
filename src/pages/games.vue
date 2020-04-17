<template lang="pug">
.games
  .games__list
    .games__item(v-for="game in gameList" :key="game.number")
      .games__number {{ game.number }}
      .games__name {{ game.name }}
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

interface GameItem {
  number: string;
  name: string;
}

export default defineComponent({
  setup (_, context) {
    const gameList = ref<GameItem[]>([
      { number: "001", name: "othello" }
    ])
    return { gameList }
  }
})
</script>


<style lang="stylus" scoped>
.game
  &__list
    width: 90%
    display: flex
    justify-content: space-between
    margin: 50px auto 0
  &__item
    width: 30%
    border: 1px solid #ccc
    height: 150px
    position: relative
</style>
