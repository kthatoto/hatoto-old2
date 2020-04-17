<template lang="pug">
.index
  Title
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

import Title from '@/components/Title'

export default defineComponent({
  components: { Title },
  setup (_, context) {
    return {}
  }
})
</script>

<style lang="stylus" scoped>
</style>
