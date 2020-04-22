<template lang="pug">
.freecell
  .freecell__header
  Table
</template>

<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'

import Table from './Table.vue'

export default defineComponent({
  components: { Table },
  setup (_, _context) {
    return {}
  }
})
</script>

<style lang="stylus" scoped>
</style>
