<template lang="pug">
.othello
  .othello__header
    .othello__header-console
      .othello__black
        p black
        el-select(size="mini" :value="blackOperating" @change="v => changeOperating('black', v)")
          el-option(label="You" value="you")
          el-option(label="NPC Lv1" value="npclv1")
      .othello__white
        p white
        el-select(size="mini" :value="whiteOperating" @change="v => changeOperating('white', v)")
          el-option(label="You" value="you")
          el-option(label="NPC Lv1" value="npclv1")
    .othello__counts
      span.-black {{ stoneCounts.black }}
      span.-versus(data-inverted="-") -
      span.-white {{ stoneCounts.white }}
    .othello__turn
      span(:class="'-' + turn") {{ turn }} turn
  Board(@click.native="clickAnywhere")
  .othello__finished(v-if="finished" @click="restart")
    h2.othello__result
      p.result
        span(v-if="winning !== 'draw'") {{ winning }} won
        span(v-else) draw
      p click to restart
</template>

<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'

import { buildStore, storeInjectionKey } from './store'
import Board from './board.vue'

export default defineComponent({
  components: { Board },
  setup (_, _context) {
    const store = buildStore()
    provide(storeInjectionKey, store)

    return {
      turn: store.turn,
      stoneCounts: store.stoneCounts,
      blackOperating: store.blackOperating,
      whiteOperating: store.whiteOperating,
      changeOperating: store.changeOperating,
      clickAnywhere: store.clickAnywhere,
      finished: store.finished,
      winning: store.winning,
      restart: store.restart
    }
  }
})
</script>

<style lang="stylus" scoped>
.othello
  background-color: #009a57
  font-weight: bold
  position: relative
  &__header
    height: 80px
    padding: 15px 50px 0
    position: relative
    &-console
      display: flex
      justify-content: space-between
  &__black
    font-size: 20px
    text-align: left
    color: black
  &__white
    font-size: 20px
    text-align: right
    color: white
  &__turn
    font-size: 24px
    position: absolute
    width: 150px
    margin: auto
    text-align: center
    top: 40px
    left: 0
    right: 0
    .-white
      color: white
    .-black
      color: black
  &__counts
    font-size: 24px
    position: absolute
    width: 70px
    display: flex
    justify-content: center
    margin: auto
    top: 15px
    left: 0
    right: 0
    .-white
      width: 30px
      text-align: left
      color: white
    .-black
      width: 30px
      text-align: right
      color: black
    .-versus
      width: 10px
      transform: scaleX(1.5)
      color: white
      position: relative
      margin: 0 4px
      &:before
        content: attr(data-inverted)
        overflow: hidden
        position: absolute
        left: 0
        top: 0
        width: 50%
        color: black
  &__finished
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.4)
    cursor: pointer
  &__result
    position: absolute
    width: 100%
    text-align: center
    padding-top: 200px
    font-size: 32px
    color: white
    .result
      font-size: 48px
</style>

<style lang="stylus">
.othello__header
  .el-select
    width: 100px
</style>
