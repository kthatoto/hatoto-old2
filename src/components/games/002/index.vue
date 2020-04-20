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
import { MessageBox } from 'element-ui'

import { buildStore, storeInjectionKey, Difficulty } from './store'
import Board from './Board.vue'

export default defineComponent({
  components: { Board },
  setup (_, _context) {
    const store = buildStore()
    provide(storeInjectionKey, store)

    const changeDifficulty = (difficulty: Difficulty) => {
      const call = () => { store.changeDifficulty(difficulty) }
      if (store.gameStatus.value !== 'playing') return call()
      MessageBox({
        message: `Would you like to play a new game with <strong>${difficulty.toUpperCase()}</strong>?`,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
        dangerouslyUseHTMLString: true,
        customClass: 'change-difficulty-confirm',
        callback: (res) => {
          if (res === 'confirm') call()
        }
      })
    }

    return {
      difficulty: store.difficulty,
      changeDifficulty
    }
  }
})
</script>

<style lang="stylus" scoped>
.minesweeper
  background-color: #c0c0c0
  position: relative
  &__header
    height: 50px
    padding: 12px 35px 0
    position: relative
</style>

<style lang="stylus">
.minesweeper
  .el-select
    width: 120px
    .el-input
      font-size: 16px

.change-difficulty-confirm
  width: 90%
  max-width: 500px
</style>
