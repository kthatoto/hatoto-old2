<template lang="pug">
.minesweeper
  .minesweeper__header
    el-select.minesweeper__difficulty(size="mini" :value="difficulty" @change="changeDifficulty")
      el-option(label="Easy" value="easy")
      el-option(label="Normal" value="normal")
      el-option(label="Difficult" value="difficult")
  Board
</template>

<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'

import { buildStore, storeInjectionKey } from './store'
import Board from './Board.vue'

export default defineComponent({
  components: { Board },
  setup (_, _context) {
    const store = buildStore()
    provide(storeInjectionKey, store)

    return {
      difficulty: store.difficulty,
      changeDifficulty: store.changeDifficulty
    }
  }
})
</script>

<style lang="stylus" scoped>
.minesweeper
  background-color: #c0c0c0
  position: relative
  &__header
    height: 70px
    padding: 20px 25px 0
    position: relative
</style>

<style lang="stylus">
.minesweeper
  .el-select
    width: 120px
    .el-input
      font-size: 16px
</style>
