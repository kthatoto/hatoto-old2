<template lang="pug">
.minesweeper
  h1 MineSweeper
</template>

<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'

import { buildStore, storeInjectionKey } from './store'

export default defineComponent({
  setup (_, _context) {
    const store = buildStore()
    provide(storeInjectionKey, store)

    return {
    }
  }
})
</script>
